// services/otpService.js

const { sendEmail } = require('../services/emailService');

const otpStore = {}; // { "email@example.com": { otp: "123456", expires: <timestamp> } }

function generateOTP(email, ttlSeconds = 300) {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expires = Date.now() + ttlSeconds * 1000;

  otpStore[email] = { otp, expires };
  
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

async function sendOTP(email) {
  // Get the OTP from the store instead of generating a new one
  const otpRecord = otpStore[email];
  if (!otpRecord) {
    throw new Error('No OTP found for this email');
  }
  
  const otp = otpRecord.otp;
  const subject = 'Your OTP Code';
  const text = `Your OTP code is: ${otp}. It is valid for 5 minutes.`;
  const html = `<p>Your OTP code is: <strong>${otp}</strong>.</p><p>It is valid for 5 minutes.</p>`;

  try {
    await sendEmail(email, subject, text, html);
    return otp;
  } catch (err) {
    console.error('Failed to send OTP email:', err);
    throw new Error('Failed to send OTP email.');
  }
}

module.exports = {
  generateOTP,
  verifyOTP,
  sendOTP
};