// src/controllers/userDataController.js
const express = require('express');
const User = require('../model/userModel');
const jwt = require('jsonwebtoken');

async function setUserType(req, res) {

  const allowedTypes = ['Player', 'Parent', 'Talent', 'Supervisor', 'Organization'];
  const { token, accountType } = req.body;

  // accountType is allowed types
  if (!allowedTypes.includes(accountType)) {
    return res.status(400).json({ error: `Invalid account type. Allowed types: ${allowedTypes.join(', ')}.` });
  }


  // Validate that both token and accountType are provided
  if (!token || !accountType) {
    return res.status(400).json({ error: 'Token and accountType are required.' });
  }

  // Validate that accountType is allowed
  if (!allowedTypes.includes(accountType)) {
    return res.status(400).json({ 
      error: `Invalid account type. Allowed types: ${allowedTypes.join(', ')}.` 
    });
  }

  // Cheak if the token is valid and if the user is authenticated
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  if (!decodedToken) {
    return res.status(401).json({ error: 'Invalid token.' });
  }

  // check if token is expired
  if (decodedToken.exp < Date.now() / 1000) {
    return res.status(401).json({ error: 'Token expired.' });
  }
try {
  // get the user from the database
  const user = await User.findById(decodedToken.id);
  if (!user) {
    return res.status(401).json({ error: 'User not found.' });
  }
  // update the accountType
  user.accountType = accountType;
  await user.save();
  return res.status(200).json({ message: 'User account type updated successfully.' });
} catch (error) {
  return res.status(401).json({ error: 'User not found.' });
}


  
  


}

// Get user data by ID
const getUserData = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ user });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  setUserType,
  getUserData
};
