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
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
