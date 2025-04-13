// src/middlewares/rateLimiter.js
const rateLimit = require('express-rate-limit');

const otpRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 6,                   // limit each IP to 5 OTP requests per window
  message: {
    error: 'Too many OTP requests, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  otpRateLimiter,
};
