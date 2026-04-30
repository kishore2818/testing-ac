const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const projectSchema = new mongoose.Schema({
  name: String,
  status: String,
  image: String
});

const Project = mongoose.model('Project', projectSchema);

const localImages = [
  '/Users/kishoreabinash2005/.gemini/antigravity/brain/9a05b855-1aea-4c79-85d4-36684431e12b/ongoing_construction_1_1777443051757.png',
  '/Users/kishoreabinash2005/.gemini/antigravity/brain/9a05b855-1aea-4c79-85d4-36684431e12b/ongoing_construction_2_1777443080457.png',
  '/Users/kishoreabinash2005/.gemini/antigravity/brain/9a05b855-1aea-4c79-85d4-36684431e12b/ongoing_construction_3_1777443100575.png',
  '/Users/kishoreabinash2005/.gemini/antigravity/brain/9a05b855-1aea-4c79-85d4-36684431e12b/ongoing_construction_4_1777443116260.png',
  '/Users/kishoreabinash2005/.gemini/antigravity/brain/9a05b855-1aea-4c79-85d4-36684431e12b/ongoing_construction_5_1777443134499.png'
];

async function migrate() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const ongoingProjects = await Project.find({ status: 'In Progress' });
    console.log(`Found ${ongoingProjects.length} ongoing projects`);

    for (let i = 0; i < ongoingProjects.length; i++) {
      if (i < localImages.length) {
        const result = await cloudinary.uploader.upload(localImages[i], {
          folder: 'adler-contracts/projects'
        });
        console.log(`Uploaded image for: ${ongoingProjects[i].name}`);
        ongoingProjects[i].image = result.secure_url;
        await ongoingProjects[i].save();
      }
    }

    console.log('Migration complete');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

migrate();
