const express = require('express'); // Import Express
const { loginUser, registerUser } = require('../controllers/userController'); // Import controllers
const router = express.Router(); // Create a router

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

module.exports = router; // Export the router
