// src/validations/authValidations.js
const { body, validationResult } = require('express-validator');

const signupValidationRules = [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('userName').notEmpty().withMessage('Username is required'),
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('phone').isMobilePhone().withMessage('Invalid phone number'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('email').notEmpty().withMessage('Email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  body('confirmPassword').notEmpty().withMessage('Confirm password is required'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  }),
  // body('accountType').notEmpty().withMessage('Account type is required'),
  // body('accountType').isIn(['Player', 'Parent', 'Talent', 'Supervisor', 'Organization']).withMessage('Invalid account type'),
];

const otpVerificationRules = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('otp').notEmpty().withMessage('OTP is required'),
];

function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

module.exports = {
  signupValidationRules,
  otpVerificationRules,
  validateRequest,
};