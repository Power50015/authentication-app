// src/controllers/authController.js
require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const { generateOTP, verifyOTP } = require("../services/otpService");
const bcrypt = require('bcryptjs');

async function signup(req, res, next) {
  try {
    const { email, userName } = req.body;

    // Check if user already exists.
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User already exists. Please sign in." });
    }
    const existingUserName = await User.findOne({ userName });
    if (existingUserName) {
      return res
        .status(400)
        .json({ error: "Username already exists. Please sign in." });
    }

    // Generate OTP (valid for 5 minutes).
    const otp = generateOTP(email);
    console.log(`Signup OTP for ${email}: ${otp}`);

    // Here, you would integrate an email service to actually send the OTP.
    res.json({ message: "User data valid. OTP generated and sent." });
  } catch (error) {
    console.error('Signup error:', error);
    next(error);
  }
}

async function signupVerify(req, res, next) {
  try {
    const { email, otp, firstName, lastName, userName, phone, password } = req.body;

    // Verify the OTP.
    const isValid = verifyOTP(email, otp);
    if (!isValid) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    // Double-check the user doesn't already exist.
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ error: "User already exists. Please sign in." });
    }

    // Create the new user.
    user = await User.create({
      firstName,
      lastName,
      userName,
      phone,
      email,
      isEmailVerified: true,
      passwordHash: await bcrypt.hash(password, 10),
    });

    // Generate a JWT.
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET, // Securely stored in .env
      { expiresIn: "1h" }
    );

    res.status(201).json({ message: "Signup complete", user, token });
  } catch (error) {
    next(error);
  }
}

async function signin(req, res, next) {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found. Please sign up." });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate OTP (valid for 5 minutes).
    const otp = generateOTP(email);
    console.log(`Signin OTP for ${email}: ${otp}`);

    // Here, you would integrate an email service to actually send the OTP.
    res.json({ message: "User data valid. OTP generated and sent." });
  } catch (error) {
    console.error('Signin error:', error);
    next(error);
  }
}

async function signinVerify(req, res, next) {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ error: "Email and OTP are required" });
    }

    const isValid = verifyOTP(email, otp);
    if (!isValid) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found. Please sign up." });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Signin successful", user, token });
  } catch (error) {
    next(error);
  }
}

module.exports = { signup, signupVerify, signin, signinVerify };
