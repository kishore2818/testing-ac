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

const localImages = [
  '/Users/kishoreabinash2005/.gemini/antigravity/brain/9a05b855-1aea-4c79-85d4-36684431e12b/ongoing_construction_1_1777443051757.png',
  '/Users/kishoreabinash2005/.gemini/antigravity/brain/9a05b855-1aea-4c79-85d4-36684431e12b/ongoing_construction_2_1777443080457.png',
  '/Users/kishoreabinash2005/.gemini/antigravity/brain/9a05b855-1aea-4c79-85d4-36684431e12b/ongoing_construction_3_1777443100575.png',
  '/Users/kishoreabinash2005/.gemory/antigravity/brain/9a05b855-1aea-4c79-85d4-36684431e12b/ongoing_construction_4_1777443116260.png',
  '/Users/kishoreabinash2005/.gemini/antigravity/brain/9a05b855-1aea-4c79-85d4-36684431e12b/ongoing_construction_5_1777443134499.png'
];

// Wait, I noticed a typo in my localImages array path (gemory vs gemini)
const correctedImages = [
  '/Users/kishoreabinash2005/.gemini/antigravity/brain/9a05b855-1aea-4c79-85d4-36684431e12b/ongoing_construction_1_1777443051757.png',
  '/Users/kishoreabinash2005/.gemini/antigravity/brain/9a05b855-1aea-4c79-85d4-36684431e12b/ongoing_construction_2_1777443080457.png',
  '/Users/kishoreabinash2005/.gemini/antigravity/brain/9a05b855-1aea-4c79-85d4-36684431e12b/ongoing_construction_3_1777443100575.png',
  '/Users/kishoreabinash2005/.gemini/antigravity/brain/9a05b855-1aea-4c79-85d4-36684431e12b/ongoing_construction_4_1777443116260.png',
  '/Users/kishoreabinash2005/.gemini/antigravity/brain/9a05b855-1aea-4c79-85d4-36684431e12b/ongoing_construction_5_1777443134499.png'
];

async function reupload() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    const ongoingProjects = await Project.find({ status: 'In Progress' });
    console.log(`Found ${ongoingProjects.length} in-progress projects.`);

    for (let i = 0; i < ongoingProjects.length; i++) {
      const project = ongoingProjects[i];
      const imagePath = correctedImages[i % correctedImages.length];
      
      console.log(`Uploading ${imagePath} for ${project.name}...`);
      const result = await cloudinary.uploader.upload(imagePath, { 
        folder: 'adler-contracts/projects',
        use_filename: true,
        unique_filename: true
      });
      
      project.image = result.secure_url;
      await project.save();
      console.log(`✓ Updated ${project.name} with ${result.secure_url}`);
    }

    console.log('All images re-uploaded and database updated.');
    process.exit(0);
  } catch (err) {
    console.error('Error during re-upload:', err);
    process.exit(1);
  }
}

reupload();
