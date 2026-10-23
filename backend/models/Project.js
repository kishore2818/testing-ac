const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  client: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, required: true, enum: ['In Progress', 'Completed'] },
  description: { type: String, required: true },
  progress: { type: Number, required: true, min: 0, max: 100 },
  image: { type: String, required: true },
  // New fields to match frontend data
  value: { type: String, default: '' },
  capacity: { type: String, default: '' },
  powerCapacity: { type: String, default: '' },
  workAwarded: { type: String, default: '' },
  duration: { type: String, default: '' },
  scope: [{ type: String }],
  gallery: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
