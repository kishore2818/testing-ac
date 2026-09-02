const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  passwordHash: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);
