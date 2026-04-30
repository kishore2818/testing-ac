const mongoose = require('mongoose');
require('dotenv').config();
const AdminCredential = require('./models/AdminCredential');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    try {
      const admin = await AdminCredential.findOne({});
      console.log('Admin:', admin);
    } catch (e) {
      console.error('Error:', e);
    }
    process.exit(0);
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
