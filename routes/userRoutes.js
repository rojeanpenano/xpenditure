const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getBalances, updateBalances } = require('../controllers/userController'); // Import controller functions
const { protect } = require('../middleware/authMiddleware'); // Import the protect middleware

// Route to register a new user
router.post('/register', registerUser);

// Route to login a user
router.post('/login', loginUser);

// Route to get user balances
router.get('/balances', protect, getBalances);

// Route to update user balances
router.put('/balances', protect, updateBalances);

module.exports = router;
