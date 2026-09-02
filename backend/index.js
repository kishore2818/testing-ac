const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

const Project = require('./models/Project');
const Review = require('./models/Review');
const Admin = require('./models/Admin');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'adler-fallback-secret';

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

// ── Helpers ──────────────────────────────────────────────────────────────────

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    req.admin = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// ── Connect to MongoDB & Seed Admin ──────────────────────────────────────────

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
})
  .then(async () => {
    console.log('Connected to MongoDB');
    // Seed default admin if none exists
    const existing = await Admin.findOne();
    if (!existing) {
      const defaultPassword = process.env.ADMIN_PASSWORD || 'Adler@2025';
      await Admin.create({ passwordHash: hashPassword(defaultPassword) });
      console.log(`Admin seeded with default password: ${defaultPassword}`);
    } else {
      console.log('Admin record found — skipping seed.');
    }
  })
  .catch(err => console.error('MongoDB connection error:', err));

// ── Routes ───────────────────────────────────────────────────────────────────

app.get('/', (req, res) => {
  res.json({ message: 'Adler Contracts API is running' });
});

// ── Auth Routes ──────────────────────────────────────────────────────────────

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { password } = req.body;
    if (!password) return res.status(400).json({ error: 'Password is required' });

    const admin = await Admin.findOne();
    if (!admin) return res.status(500).json({ error: 'Admin not configured' });

    const hash = hashPassword(password);
    if (hash !== admin.passwordHash) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ role: 'admin', id: admin._id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// GET /api/auth/verify  — check if token is still valid
app.get('/api/auth/verify', verifyToken, (req, res) => {
  res.json({ valid: true, admin: req.admin });
});

// POST /api/auth/change-password
app.post('/api/auth/change-password', verifyToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Both current and new passwords are required' });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters' });
    }

    const admin = await Admin.findOne();
    if (!admin) return res.status(500).json({ error: 'Admin not found' });

    if (hashPassword(currentPassword) !== admin.passwordHash) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    admin.passwordHash = hashPassword(newPassword);
    await admin.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ error: 'Failed to change password' });
  }
});

// ── Image Upload ─────────────────────────────────────────────────────────────

app.post('/api/upload', upload.single('image'), (req, res) => {
  try {
    res.json({ url: req.file.path });
  } catch (error) {
    res.status(400).json({ error: 'Failed to upload image' });
  }
});

// ── Project Routes ────────────────────────────────────────────────────────────

app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

app.post('/api/projects', upload.single('imageFile'), async (req, res) => {
  try {
    const projectData = { ...req.body };
    if (req.file) projectData.image = req.file.path;
    const project = new Project(projectData);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create project' });
  }
});

app.put('/api/projects/:id', upload.single('imageFile'), async (req, res) => {
  try {
    const projectData = { ...req.body };
    if (req.file) projectData.image = req.file.path;
    const project = await Project.findByIdAndUpdate(req.params.id, projectData, { new: true });
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update project' });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete project' });
  }
});

// ── Review Routes ─────────────────────────────────────────────────────────────

app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

app.post('/api/reviews', upload.single('imageFile'), async (req, res) => {
  try {
    const reviewData = { ...req.body };
    if (req.file) reviewData.image = req.file.path;
    const review = new Review(reviewData);
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create review' });
  }
});

app.put('/api/reviews/:id', upload.single('imageFile'), async (req, res) => {
  try {
    const reviewData = { ...req.body };
    if (req.file) reviewData.image = req.file.path;
    const review = await Review.findByIdAndUpdate(req.params.id, reviewData, { new: true });
    res.json(review);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update review' });
  }
});

app.delete('/api/reviews/:id', async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete review' });
  }
});

// ── Start Server ──────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
