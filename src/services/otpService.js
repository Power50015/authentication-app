// services/otpService.js

const { sendEmail } = require('../services/emailService');

const otpStore = {}; // { "email@example.com": { otp: "123456", expires: <timestamp> } }

function generateOTP(email, ttlSeconds = 300) {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expires = Date.now() + ttlSeconds * 1000;

  otpStore[email] = { otp, expires };
  sendOTP(email);
  return otp;
}

function verifyOTP(email, inputOTP) {
  const record = otpStore[email];
  if (!record) return false;

  if (Date.now() > record.expires) {
    delete otpStore[email];
    return false;
  }

  const isValid = record.otp === inputOTP;
  if (isValid) {
    delete otpStore[email]; // Consume the OTP upon success
  }
  return isValid;
}

async function sendOTP(email){
  // After generating an OTP
  const otp = generateOTP(email);
  const subject = 'Your OTP Code';
  const text = `Your OTP code is: ${otp}. It is valid for 5 minutes.`;
  const html = `<p>Your OTP code is: <strong>${otp}</strong>.</p><p>It is valid for 5 minutes.</p>`;

  try {
    await sendEmail(email, subject, text, html);
    return otp;
  } catch (err) {
    // Handle email sending error (e.g., log it, respond with an appropriate error message, etc.)
    console.error('Failed to send OTP email:', err);
    throw new Error('Failed to send OTP email.');
  }
}

module.exports = {
  generateOTP,
  verifyOTP,
  sendOTP
};