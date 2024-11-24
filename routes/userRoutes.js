const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');

const router = express.Router();

// Register endpoint
router.post('/register', registerUser);

// Login endpoint
router.post('/login', loginUser);

module.exports = router;
