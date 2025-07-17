
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  balance: { type: Number, default: 0 },
  installedApps: { type: [String], default: [] }
});

module.exports = mongoose.model('User', UserSchema);
