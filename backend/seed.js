const mongoose = require('mongoose');
require('dotenv').config();

const Project = require('./models/Project');
const Review = require('./models/Review');

const projects = [
  {
    name: 'Industrial Manufacturing Facility',
    client: 'SFS',
    location: 'Kanagala',
    type: 'Industrial Manufacturing',
    status: 'In Progress',
    description: 'Industrial Manufacturing Facility. Contractor: Scon Projects. Consultant: United Architects.',
    progress: 75,
    image: '/images/projects/comp-4.png',
  },
  {
    name: 'International Residential School',
    client: 'Indus Altum Trust',
    location: 'Belgaum',
    type: 'Institutional Solution',
    status: 'In Progress',
    description: 'International Residential School. Contractor: CCPL. Consultant: Ace Architects / Maple.',
    progress: 60,
    image: '/images/projects/comp-5.png',
  },
  {
    name: 'Luxurious Villa Project',
    client: 'BK Joshi',
    location: 'Belgaum',
    type: 'Residential',
    status: 'In Progress',
    description: 'Luxurious Villa Project. Contractor: CCPL.',
    progress: 45,
    image: '/images/projects/comp-6.png',
  },
  {
    name: 'Cold Storage & Office Area',
    client: 'SATS Food Solutions',
    location: 'Bangalore',
    type: 'Food Tech Infrastructure',
    status: 'Completed',
    description: 'Cold Storage & Office Area. Contractor: SPC. Consultant: Vestian Global / Aditi.',
    progress: 100,
    image: '/images/projects/comp-1.png',
  },
  {
    name: 'Office Space - A & D',
    client: 'Office Space - A &D',
    location: 'Belgaum',
    type: 'Commercial Interiors',
    status: 'Completed',
    description: 'Office Space - A & D. Contractor: CCPL.',
    progress: 100,
    image: '/images/projects/comp-2.png',
  },
  {
    name: 'Office Space - Savance',
    client: 'Office Space - Savance',
    location: 'Belgaum',
    type: 'Commercial Interiors',
    status: 'Completed',
    description: 'Office Space - Savance. Contractor: CCPL.',
    progress: 100,
    image: '/images/projects/comp-3.png',
  }
];

const reviews = [
  {
    quote: "Adler Contracts delivered the entire electrical infrastructure for our cold storage and office facility ahead of schedule. Their turnkey approach and attention to safety standards was truly impressive.",
    name: "Operations Head",
    company: "SATS Food Solutions India Pvt Ltd",
    role: "Facility Operations",
    image: "/images/industries/food-beverage.png",
    rating: 5,
    location: "Bangalore"
  },
  {
    quote: "The precision and quality of Adler's electrical work at our aerospace manufacturing unit met the most stringent international standards. A truly reliable partner for critical infrastructure.",
    name: "Project Manager",
    company: "Thyssenkrupp Aerostructures Pvt Ltd",
    role: "Project Engineering",
    image: "/images/industries/aerospace.png",
    rating: 5,
    location: "Pune"
  },
  {
    quote: "From design to commissioning, Adler Contracts managed our entire electrification project with meticulous planning and zero safety incidents. We highly recommend their services.",
    name: "Engineering Director",
    company: "Aequs SEZ Ltd",
    role: "Infrastructure Development",
    image: "/images/industries/construction.png",
    rating: 5,
    location: "Belagavi"
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data to avoid duplicates
    await Project.deleteMany();
    await Review.deleteMany();

    await Project.insertMany(projects);
    await Review.insertMany(reviews);

    console.log('Data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedDatabase();
