const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobileNumber: String,
  image: String,
  password: String,
  isVerified: { type: Boolean, default: false },
  otp: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
