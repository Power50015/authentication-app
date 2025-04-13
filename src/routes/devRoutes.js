// src/routes/devRoutes.js
const express = require('express');
const User = require('../model/userModel');

const router = express.Router();
// only for dev mode
if (process.env.NODE_ENV === 'development') {
    router.get('/allusers', getAllUsers);
    async function getAllUsers(req, res, next) {
        try {
            const users = await User.find({});
            res.json(users);
        } catch (error) {
            next(error);
        }
    }
}



module.exports = router;