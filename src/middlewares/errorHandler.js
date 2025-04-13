// src/middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  
  // Send a more detailed error in development
  if (process.env.NODE_ENV === 'development') {
    return res.status(500).json({
      error: err.message,
      stack: err.stack
    });
  }
  
  // Generic error in production
  res.status(500).json({ error: 'Internal server error' });
};

module.exports = { errorHandler };
