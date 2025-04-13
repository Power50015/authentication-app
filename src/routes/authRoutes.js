// src/routes/authRoutes.js
const express = require('express');
const { signup, signupVerify, signin, signinVerify } = require('../controllers/authController');
const { signupValidationRules, otpVerificationRules, validateRequest } = require('../validations/authValidations');
const { otpRateLimiter } = require('../middlewares/rateLimiter');

const router = express.Router();

// Phase 1 of Signup: Validate user data & send OTP.
router.post('/signup', signupValidationRules, validateRequest, otpRateLimiter, signup);

// Phase 2 of Signup: Verify OTP and create the user.
router.post('/signup/verify', otpVerificationRules, validateRequest, otpRateLimiter, signupVerify);

// Signin using OTP.
router.post('/signin', validateRequest, otpRateLimiter, signin);

router.post('/signin/verify', otpVerificationRules, validateRequest, otpRateLimiter, signinVerify);


module.exports = router;