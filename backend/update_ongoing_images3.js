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

const imageMap = [
  { index: 2, path: '/Users/kishoreabinash2005/.gemini/antigravity/brain/9a05b855-1aea-4c79-85d4-36684431e12b/ongoing_construction_3_1777443100575.png' },
  { index: 3, path: '/Users/kishoreabinash2005/.gemini/antigravity/brain/9a05b855-1aea-4c79-85d4-36684431e12b/ongoing_construction_4_1777443116260.png' },
  { index: 4, path: '/Users/kishoreabinash2005/.gemini/antigravity/brain/9a05b855-1aea-4c79-85d4-36684431e12b/ongoing_construction_5_1777443134499.png' },
];

async function migrate() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const ongoingProjects = await Project.find({ status: 'In Progress' });

    for (const { index, path } of imageMap) {
      if (index < ongoingProjects.length) {
        console.log(`Uploading for: ${ongoingProjects[index].name}`);
        const result = await cloudinary.uploader.upload(path, { folder: 'adler-contracts/projects' });
        ongoingProjects[index].image = result.secure_url;
        await ongoingProjects[index].save();
        console.log(`✓ Updated: ${ongoingProjects[index].name}`);
      }
    }
    console.log('Migration complete!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
migrate();
