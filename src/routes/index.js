// src/routes/index.js
const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
// const profileRoutes = require('./profileRoutes');
// const metadataRoutes = require('./metadataRoutes');

router.use('/auth', authRoutes);
// router.use('/profile', profileRoutes);
// router.use('/metadata', metadataRoutes);

module.exports = router;
