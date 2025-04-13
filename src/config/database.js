// src/config/database.js
const mongoose = require('mongoose');
const { MONGO_URI } = process.env;

function connectDatabase() {
  if (!MONGO_URI) {
    throw new Error('MONGO_URI environment variable is not set.');
  }

  // Mongoose recommended connection options
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  return mongoose
    .connect(MONGO_URI, options)
    .then(() => {
      console.log(`MongoDB connected at ${MONGO_URI}`);
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err);
      process.exit(1);
    });
}

module.exports = connectDatabase;