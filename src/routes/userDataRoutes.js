// src/controllers/userDataRoutes.js
const express = require('express');
const { setUserType, getUserData } = require('../controllers/userDataController');
const User = require('../model/userModel');

const router = express.Router();

router.post('/setUserType', setUserType);

// Get user data by ID
router.get('/:id', getUserData);

module.exports = router;