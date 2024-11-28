const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getBalances,
    updateBalances,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// User registration
router.post('/register', registerUser);

// User login
router.post('/login', loginUser);

// Retrieve user balances
router.get('/balances', protect, getBalances);

// Update user balances
router.put('/balances', protect, updateBalances);

module.exports = router;
