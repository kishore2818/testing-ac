const mongoose = require('mongoose');

const AdminCredentialSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'admin_credentials',
  }
);

module.exports = mongoose.model('AdminCredential', AdminCredentialSchema);
