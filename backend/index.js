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

const app = express();
const PORT = process.env.PORT || 5000;

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
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 2000,
})
  .then(async () => {
    console.log('Connected to MongoDB');
  })
  .catch(err => console.error('MongoDB connection error:', err));

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Adler Contracts API is running' });
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
