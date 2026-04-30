const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const projectSchema = new mongoose.Schema({}, { strict: false });
const Project = mongoose.model('Project', projectSchema);

// Upload each image one at a time with retry
async function uploadWithRetry(imagePath, options, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const result = await cloudinary.uploader.upload(imagePath, {
        ...options,
        timeout: 120000
      });
      return result;
    } catch (err) {
      console.log(`Attempt ${i + 1} failed: ${err.message}`);
      if (i === retries - 1) throw err;
      await new Promise(r => setTimeout(r, 3000));
    }
  }
}

async function migrate() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const ongoingProjects = await Project.find({ status: 'In Progress' });
    console.log(`Found ${ongoingProjects.length} ongoing projects`);
    console.log('Names:', ongoingProjects.map(p => p.name));

    // Map specific images to specific projects
    const imageMap = [
      { index: 2, path: '/Users/kishoreabinash2005/.gemini/antigravity/brain/9a05b855-1aea-4c79-85d4-36684431e12b/ongoing_construction_3_1777443100575.png' },
      { index: 3, path: '/Users/kishoreabinash2005/.gemini/antigravity/brain/9a05b855-1aea-4c79-85d4-36684431e12b/ongoing_construction_4_1777443116260.png' },
      { index: 4, path: '/Users/kishoreabinash2005/.gemini/antigravity/brain/9a05b855-1aea-4c79-85d4-36684431e12b/ongoing_construction_5_1777443134499.png' },
    ];

    for (const { index, path } of imageMap) {
      if (index < ongoingProjects.length) {
        console.log(`Uploading image ${index + 1} for: ${ongoingProjects[index].name}`);
        const result = await uploadWithRetry(path, { folder: 'adler-contracts/projects' });
        ongoingProjects[index].image = result.secure_url;
        await ongoingProjects[index].save();
        console.log(`✓ Updated: ${ongoingProjects[index].name}`);
      }
    }

    console.log('Migration complete!');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

migrate();
