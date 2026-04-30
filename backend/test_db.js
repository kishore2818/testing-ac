const mongoose = require('mongoose');
require('dotenv').config();
const projectSchema = new mongoose.Schema({}, { strict: false });
const Project = mongoose.model('Project', projectSchema);

async function test() {
  await mongoose.connect(process.env.MONGO_URI);
  const p = await Project.find({ status: 'In Progress' });
  console.log(p.map(x => x.get('image')));
  process.exit(0);
}
test();
