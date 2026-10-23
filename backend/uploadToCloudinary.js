require('dotenv').config();
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const Project = require('./models/Project');
const Review = require('./models/Review');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const FRONTEND_PUBLIC_DIR = path.resolve(__dirname, '../frontend/public');
const uploadCache = new Map();

async function uploadLocalImage(relPath, subfolder) {
  if (!relPath) return null;
  if (relPath.startsWith('http://') || relPath.startsWith('https://')) {
    return relPath; // Already on Cloudinary or external URL
  }

  // Normalize path removing leading slash
  const cleanPath = relPath.startsWith('/') ? relPath.slice(1) : relPath;
  const absPath = path.join(FRONTEND_PUBLIC_DIR, cleanPath);

  if (uploadCache.has(absPath)) {
    return uploadCache.get(absPath);
  }

  if (!fs.existsSync(absPath)) {
    console.warn(`[WARN] File not found at: ${absPath}`);
    return relPath;
  }

  try {
    console.log(`Uploading to Cloudinary: ${cleanPath}...`);
    const result = await cloudinary.uploader.upload(absPath, {
      folder: `adler-contracts/${subfolder}`,
      resource_type: 'image',
    });
    uploadCache.set(absPath, result.secure_url);
    console.log(`✓ Uploaded: ${result.secure_url}`);
    return result.secure_url;
  } catch (err) {
    console.error(`Failed to upload ${cleanPath}:`, err.message);
    return relPath;
  }
}

async function runMigration() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 15000 });
    console.log('Connected to MongoDB. Starting Cloudinary migration...');

    // ── 1. Migrate Projects ──────────────────────────────────────────────────
    const projects = await Project.find();
    console.log(`Found ${projects.length} projects to check.`);

    for (const project of projects) {
      let changed = false;

      // Migrate main image
      if (project.image && !project.image.startsWith('http')) {
        const cloudUrl = await uploadLocalImage(project.image, 'projects');
        if (cloudUrl && cloudUrl !== project.image) {
          project.image = cloudUrl;
          changed = true;
        }
      }

      // Migrate gallery
      if (Array.isArray(project.gallery) && project.gallery.length > 0) {
        const newGallery = [];
        for (const photo of project.gallery) {
          if (photo && !photo.startsWith('http')) {
            const cloudUrl = await uploadLocalImage(photo, 'projects');
            newGallery.push(cloudUrl || photo);
            if (cloudUrl !== photo) changed = true;
          } else {
            newGallery.push(photo);
          }
        }
        project.gallery = newGallery;
      }

      if (changed) {
        await project.save();
        console.log(`[UPDATED] Project "${project.name}" with Cloudinary URLs.`);
      } else {
        console.log(`[UNCHANGED] Project "${project.name}" already uses Cloudinary.`);
      }
    }

    // ── 2. Migrate Reviews / Testimonials ───────────────────────────────────
    const reviews = await Review.find();
    console.log(`Found ${reviews.length} reviews to check.`);

    for (const review of reviews) {
      let changed = false;
      if (review.image && !review.image.startsWith('http')) {
        const cloudUrl = await uploadLocalImage(review.image, 'reviews');
        if (cloudUrl && cloudUrl !== review.image) {
          review.image = cloudUrl;
          changed = true;
        }
      }

      if (changed) {
        await review.save();
        console.log(`[UPDATED] Review from "${review.name}" with Cloudinary URL.`);
      } else {
        console.log(`[UNCHANGED] Review from "${review.name}" already uses Cloudinary.`);
      }
    }

    console.log('\nMigration to Cloudinary completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

runMigration();
