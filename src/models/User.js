const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  jobPosition: {
    type: String,
    required: true,
    trim: true,
    enum: ['Employee', 'Manager'],
  },
  epfNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  twoFactorEnabled: { type: Boolean, defualt: false },
  otp:{
    type: String,
  },
  otpExpiration:{
    type:Date,
  },
  twoFactorSecret: String,
  twoFactorToken: String,
});

module.exports = mongoose.model('User', userSchema);