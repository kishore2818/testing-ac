const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const Project = require('./models/Project');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const projectsData = [
  {
    name: 'Industrial Manufacturing Facility',
    client: 'SFS',
    location: 'Kanagala',
    type: 'Industrial Manufacturing',
    status: 'In Progress',
    description: 'Industrial Manufacturing Facility. Contractor: Scon Projects. Consultant: United Architects.',
    progress: 75,
    localImage: '/images/projects/ongoing-1.jpg' // We'll map this manually
  },
  {
    name: 'International Residential School',
    client: 'Indus Altum Trust',
    location: 'Belgaum',
    type: 'Institutional Solution',
    status: 'In Progress',
    description: 'International Residential School. Contractor: CCPL. Consultant: Ace Architects / Maple.',
    progress: 60,
    localImage: '/images/projects/ongoing-2.jpg'
  },
  {
    name: 'Luxurious Villa Project',
    client: 'BK Joshi',
    location: 'Belgaum',
    type: 'Residential',
    status: 'In Progress',
    description: 'Luxurious Villa Project. Contractor: CCPL.',
    progress: 45,
    localImage: '/images/projects/ongoing-3.jpg'
  },
  {
    name: 'Industrial Manufacturing Facility',
    client: 'Thyssenkrupp Aerospace',
    location: 'Bangalore',
    type: 'Precision Distribution',
    status: 'In Progress',
    description: 'Industrial Manufacturing Facility. Contractor: CCPL. Consultant: CRN.',
    progress: 70,
    localImage: '/images/projects/ongoing-4.jpg'
  },
  {
    name: 'Industrial Manufacturing Facility',
    client: 'Inovit Solutions',
    location: 'Bangalore',
    type: 'Industrial Automation',
    status: 'In Progress',
    description: 'Industrial Manufacturing Facility. Contractor: CCPL.',
    progress: 85,
    localImage: '/images/projects/ongoing-5.jpg'
  },
  // COMPLETED
  {
    name: 'Cold Storage & Office Area',
    client: 'SATS Food Solutions',
    location: 'Bangalore',
    type: 'Food Tech Infrastructure',
    status: 'Completed',
    description: 'Cold Storage & Office Area. Contractor: SPC. Consultant: Vestian Global / Aditi.',
    progress: 100,
    localImage: '/images/projects/comp-1.png',
  },
  {
    name: 'Office Space - A & D',
    client: 'Office Space - A &D',
    location: 'Belgaum',
    type: 'Commercial Interiors',
    status: 'Completed',
    description: 'Office Space - A & D. Contractor: CCPL.',
    progress: 100,
    localImage: '/images/projects/comp-2.png',
  },
  {
    name: 'Office Space - Savance',
    client: 'Office Space - Savance',
    location: 'Belgaum',
    type: 'Commercial Interiors',
    status: 'Completed',
    description: 'Office Space - Savance. Contractor: CCPL.',
    progress: 100,
    localImage: '/images/projects/comp-3.png',
  },
  {
    name: 'Warehousing',
    client: 'Menzis Aviation',
    location: 'Bangalore',
    type: 'Logistics Infrastructure',
    status: 'Completed',
    description: 'Warehousing. Contractor: SPC. Consultant: Turner & Townsend.',
    progress: 100,
    localImage: '/images/projects/comp-4.png',
  },
  {
    name: 'Manufacturing Facility',
    client: 'Jinabakul Forge Pvt Ltd',
    location: 'Kanagala',
    type: 'Industrial Infrastructure',
    status: 'Completed',
    description: 'Manufacturing Facility.',
    progress: 100,
    localImage: '/images/projects/comp-5.png',
  },
  {
    name: 'Manufacturing Facility - Electronic Component',
    client: 'Sterling Mobility India',
    location: 'Bangalore',
    type: 'Industrial Automation',
    status: 'Completed',
    description: 'Manufacturing Facility - Electronic Component.',
    progress: 100,
    localImage: '/images/projects/comp-6.png',
  },
  {
    name: 'Commercial Space',
    client: 'White Oaks',
    location: 'Bangalore',
    type: 'Commercial Infrastructure',
    status: 'Completed',
    description: 'Commercial Space.',
    progress: 100,
    localImage: '/images/projects/comp-7.png',
  }
];

const FRONTEND_PUBLIC = path.join(__dirname, '..', 'frontend', 'public');

// These are the images we successfully generated and uploaded earlier
const ongoingCloudinaryUrls = [
  "https://res.cloudinary.com/ddg5ao8e7/image/upload/v1777443367/adler-contracts/projects/raftc27sl4bbld23n5jf.jpg",
  "https://res.cloudinary.com/ddg5ao8e7/image/upload/v1777443422/adler-contracts/projects/nwir1fpq0twaa7uyqdv1.jpg",
  "https://res.cloudinary.com/ddg5ao8e7/image/upload/v1777443486/adler-contracts/projects/iytqw4xyq895h43j2oix.jpg",
  "https://res.cloudinary.com/ddg5ao8e7/image/upload/v1777443564/adler-contracts/projects/hqozc9gq01hxw1t16238.jpg",
  "https://res.cloudinary.com/ddg5ao8e7/image/upload/v1777443657/adler-contracts/projects/zdfjqgqwqz92z2q3wqw1.jpg"
];

async function fixDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Project.deleteMany({});
    console.log('Cleared existing projects.');

    let ongoingIndex = 0;

    for (const data of projectsData) {
      let imageUrl = '';

      if (data.status === 'In Progress') {
        imageUrl = ongoingCloudinaryUrls[ongoingIndex % ongoingCloudinaryUrls.length];
        ongoingIndex++;
      } else {
        const localPath = path.join(FRONTEND_PUBLIC, data.localImage);
        if (fs.existsSync(localPath)) {
          console.log(`Uploading ${data.localImage}...`);
          const result = await cloudinary.uploader.upload(localPath, {
            folder: 'adler-contracts/projects',
          });
          imageUrl = result.secure_url;
        } else {
          console.warn(`File not found: ${localPath}, using placeholder`);
          imageUrl = 'https://via.placeholder.com/800x600?text=No+Image';
        }
      }

      await Project.create({
        name: data.name,
        client: data.client,
        location: data.location,
        type: data.type,
        status: data.status,
        description: data.description,
        progress: data.progress,
        image: imageUrl
      });
      console.log(`Created project: ${data.name}`);
    }

    console.log('Database fixed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error fixing database:', error);
    process.exit(1);
  }
}

fixDatabase();
