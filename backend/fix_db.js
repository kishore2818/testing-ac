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

const correctedImages = [
  '/Users/kishoreabinash2005/.gemini/antigravity/brain/9a05b855-1aea-4c79-85d4-36684431e12b/ongoing_construction_1_1777443051757.png',
  '/Users/kishoreabinash2005/.gemini/antigravity/brain/9a05b855-1aea-4c79-85d4-36684431e12b/ongoing_construction_2_1777443080457.png',
  '/Users/kishoreabinash2005/.gemini/antigravity/brain/9a05b855-1aea-4c79-85d4-36684431e12b/ongoing_construction_3_1777443100575.png',
  '/Users/kishoreabinash2005/.gemini/antigravity/brain/9a05b855-1aea-4c79-85d4-36684431e12b/ongoing_construction_4_1777443116260.png',
  '/Users/kishoreabinash2005/.gemini/antigravity/brain/9a05b855-1aea-4c79-85d4-36684431e12b/ongoing_construction_5_1777443134499.png'
];

async function fix() {
  await mongoose.connect(process.env.MONGO_URI);
  const ongoingProjects = await Project.find({ status: 'In Progress' });
  
  for (let i = 0; i < ongoingProjects.length; i++) {
    const project = ongoingProjects[i];
    const imagePath = correctedImages[i % correctedImages.length];
    
    console.log(`Uploading ${imagePath} for ${project.get('name')}...`);
    const result = await cloudinary.uploader.upload(imagePath, { 
      folder: 'adler-contracts/projects',
      use_filename: true,
      unique_filename: true
    });
    
    await Project.updateOne({ _id: project._id }, { $set: { image: result.secure_url } });
    console.log(`✓ Updated with ${result.secure_url}`);
  }
  process.exit(0);
}
fix();
