// src/routes/index.js
const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const userDataRoutes = require('./userDataRoutes');
const devRoutes = require('./devRoutes');
// const profileRoutes = require('./profileRoutes');
// const metadataRoutes = require('./metadataRoutes');

router.use('/auth', authRoutes);
router.use('/userData', userDataRoutes);
router.use('/dev', devRoutes);
// router.use('/profile', profileRoutes);
// router.use('/metadata', metadataRoutes);

module.exports = router;
