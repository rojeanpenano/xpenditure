const express = require('express');
const { addTransaction, getTransactions } = require('../controllers/transactionController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// Debugging: Log imported functions
console.log('addTransaction:', addTransaction);
console.log('getTransactions:', getTransactions);

// Define routes
router.route('/')
    .get(protect, getTransactions) // Route for fetching transactions
    .post(protect, addTransaction); // Route for adding a new transaction

module.exports = router;