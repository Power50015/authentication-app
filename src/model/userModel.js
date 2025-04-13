// src/models/userModel.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String, //e.g @power_mostafa
    required: true,
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  passwordHash: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  accountType: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: true,
  },
  isPhoneVerified: {
    type: Boolean,
    default: false,
  },
  metaData: {
    type: JSON,
    required: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isAccountVerified: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;
