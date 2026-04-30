const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const Project = require('./models/Project');
const Review = require('./models/Review');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const FRONTEND_PUBLIC = path.join(__dirname, '..', 'frontend', 'public');

async function migrate() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Migrate Projects
    const projects = await Project.find({ image: { $regex: /^\/images/ } });
    console.log(`Found ${projects.length} projects to migrate.`);

    for (const project of projects) {
      const localPath = path.join(FRONTEND_PUBLIC, project.image);
      if (fs.existsSync(localPath)) {
        console.log(`Uploading ${project.image}...`);
        const result = await cloudinary.uploader.upload(localPath, {
          folder: 'adler-contracts',
        });
        project.image = result.secure_url;
        await project.save();
        console.log(`Project ${project.name} updated with Cloudinary URL.`);
      } else {
        console.warn(`File not found: ${localPath}`);
      }
    }

    // Migrate Reviews
    const reviews = await Review.find({ image: { $regex: /^\/images/ } });
    console.log(`Found ${reviews.length} reviews to migrate.`);

    for (const review of reviews) {
      const localPath = path.join(FRONTEND_PUBLIC, review.image);
      if (fs.existsSync(localPath)) {
        console.log(`Uploading ${review.image}...`);
        const result = await cloudinary.uploader.upload(localPath, {
          folder: 'adler-contracts',
        });
        review.image = result.secure_url;
        await review.save();
        console.log(`Review for ${review.name} updated with Cloudinary URL.`);
      } else {
        console.warn(`File not found: ${localPath}`);
      }
    }

    console.log('Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate();
