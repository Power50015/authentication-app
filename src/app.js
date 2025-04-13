// src/app.js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require('dotenv').config(); // Load environment variables from .env

// Import configs
const corsOptions = require('./config/corsConfig');
const connectDatabase = require('./config/database');
const { connectRedis } = require('./config/redis');
const { errorHandler } = require('./middlewares/errorHandler');


// Import the centralized routes from the routes folder (index.js is loaded automatically)
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware: Parse JSON payloads
app.use(express.json());

// Middleware: Enable CORS using our custom configuration
app.use(cors(corsOptions));

// Middleware: Log incoming HTTP requests using morgan
app.use(morgan("combined"));

// Connect to MongoDB and Redis before starting the server
connectDatabase().then(() => {
  // If MongoDB connected successfully, then connect Redis
  connectRedis().then(() => {
    // Only start the server after successful connections
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  });
});

// Define a simple route to test if the server is working.
app.get("/", (req, res) => {
  res.send("Hello from the Authentication App with CORS and Logging!");
});

// Use the centralized routes index for all routes
app.use('/', routes);

app.use(errorHandler);

