// src/config/corsConfig.js
const dotenv = require('dotenv');
dotenv.config();

// If in production and CORS_ALLOWED_ORIGINS is defined, split into an array; otherwise, use an empty array.
const allowedOrigins = process.env.NODE_ENV === 'production' && process.env.CORS_ALLOWED_ORIGINS
  ? process.env.CORS_ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
  : [];

/**
 * Dynamic CORS options:
 * - In development: allow all origins.
 * - In production: allow only those origins that are present in the allowedOrigins array.
 */
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g., mobile apps, curl requests)
    if (!origin) {
      return callback(null, true);
    }

    // In non-production mode, allow all origins
    if (process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }

    // In production, check if the origin is in the allowed list
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

module.exports = corsOptions;
