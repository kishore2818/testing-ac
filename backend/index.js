const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const crypto = require('crypto');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

const Project = require('./models/Project');
const Review = require('./models/Review');
const AdminCredential = require('./models/AdminCredential');

const app = express();
const PORT = process.env.PORT || 5000;
const DEFAULT_ADMIN_USERNAME = process.env.ADMIN_DEFAULT_USERNAME || 'admin';
const DEFAULT_ADMIN_EMAIL = (process.env.ADMIN_DEFAULT_EMAIL || 'admin@adlercontracts.com').toLowerCase();
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_DEFAULT_PASSWORD || 'AdlerAdmin@2026';

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Storage Configuration for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'adler-contracts',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});

const upload = multer({ storage: storage });

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());
app.use(morgan('dev'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    await ensureDefaultAdminCredential();
  })
  .catch(err => console.error('MongoDB connection error:', err));

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

async function ensureDefaultAdminCredential() {
  const existingAdmin = await AdminCredential.findOne();
  if (existingAdmin) return;

  await AdminCredential.create({
    username: DEFAULT_ADMIN_USERNAME,
    email: DEFAULT_ADMIN_EMAIL,
    passwordHash: hashPassword(DEFAULT_ADMIN_PASSWORD),
  });

  console.log('Default admin credential created in MongoDB');
}

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Adler Contracts API is running' });
});

// Admin Auth
app.post('/api/admin/auth/login', async (req, res) => {
  try {
    const identifier = typeof req.body?.identifier === 'string' ? req.body.identifier.trim() : '';
    const password = typeof req.body?.password === 'string' ? req.body.password : '';

    if (!identifier || !password) {
      return res.status(400).json({ error: 'Username/email and password are required' });
    }

    const normalizedIdentifier = identifier.toLowerCase();
    const admin = await AdminCredential.findOne({
      $or: [
        { email: normalizedIdentifier },
        { username: identifier },
      ],
    });

    if (!admin || admin.passwordHash !== hashPassword(password)) {
      return res.status(401).json({ error: 'Invalid login credentials' });
    }

    res.json({
      id: admin._id,
      username: admin.username,
      email: admin.email,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to authenticate admin user' });
  }
});

app.get('/api/admin/profile', async (req, res) => {
  try {
    const admin = await AdminCredential.findOne().sort({ createdAt: 1 });
    if (!admin) {
      return res.status(404).json({ error: 'Admin credential not found' });
    }

    res.json({
      id: admin._id,
      username: admin.username,
      email: admin.email,
      updatedAt: admin.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch admin profile' });
  }
});

app.put('/api/admin/profile', async (req, res) => {
  try {
    const admin = await AdminCredential.findOne().sort({ createdAt: 1 });
    if (!admin) {
      return res.status(404).json({ error: 'Admin credential not found' });
    }

    const username = typeof req.body?.username === 'string' ? req.body.username.trim() : '';
    const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    const currentPassword = typeof req.body?.currentPassword === 'string' ? req.body.currentPassword : '';
    const newPassword = typeof req.body?.newPassword === 'string' ? req.body.newPassword : '';

    if (!username || !email || !currentPassword) {
      return res.status(400).json({ error: 'Username, email, and current password are required' });
    }

    if (admin.passwordHash !== hashPassword(currentPassword)) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    const conflictingUser = await AdminCredential.findOne({
      _id: { $ne: admin._id },
      $or: [{ username }, { email }],
    });

    if (conflictingUser) {
      return res.status(409).json({ error: 'Username or email already exists' });
    }

    admin.username = username;
    admin.email = email;
    if (newPassword) {
      admin.passwordHash = hashPassword(newPassword);
    }

    await admin.save();

    res.json({
      id: admin._id,
      username: admin.username,
      email: admin.email,
      updatedAt: admin.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update admin profile' });
  }
});

// Image Upload Endpoint (Optional, can be used independently)
app.post('/api/upload', upload.single('image'), (req, res) => {
  try {
    res.json({ url: req.file.path });
  } catch (error) {
    res.status(400).json({ error: 'Failed to upload image' });
  }
});

// Get Projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Create Project
app.post('/api/projects', upload.single('imageFile'), async (req, res) => {
  try {
    const projectData = { ...req.body };
    if (req.file) {
      projectData.image = req.file.path;
    }
    const project = new Project(projectData);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create project' });
  }
});

// Update Project
app.put('/api/projects/:id', upload.single('imageFile'), async (req, res) => {
  try {
    const projectData = { ...req.body };
    if (req.file) {
      projectData.image = req.file.path;
    }
    const project = await Project.findByIdAndUpdate(req.params.id, projectData, { new: true });
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update project' });
  }
});

// Delete Project
app.delete('/api/projects/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete project' });
  }
});

// Get Reviews
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Create Review
app.post('/api/reviews', upload.single('imageFile'), async (req, res) => {
  try {
    const reviewData = { ...req.body };
    if (req.file) {
      reviewData.image = req.file.path;
    }
    const review = new Review(reviewData);
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create review' });
  }
});

// Update Review
app.put('/api/reviews/:id', upload.single('imageFile'), async (req, res) => {
  try {
    const reviewData = { ...req.body };
    if (req.file) {
      reviewData.image = req.file.path;
    }
    const review = await Review.findByIdAndUpdate(req.params.id, reviewData, { new: true });
    res.json(review);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update review' });
  }
});

// Delete Review
app.delete('/api/reviews/:id', async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete review' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
