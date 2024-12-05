const express = require('express');
const router = express.Router();
const { addTransaction, getTransactions } = require('../controllers/transactionController');
const { protect } = require('../middleware/authMiddleware'); // Protect routes with authentication

// Route to fetch all transactions for a user
router.get('/', protect, getTransactions);

// Route to add a new transaction
router.post('/', protect, addTransaction);

module.exports = router;