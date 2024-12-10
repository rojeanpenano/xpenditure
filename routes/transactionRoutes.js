const express = require('express');
const { addTransaction, getTransactions } = require('../controllers/transactionController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// Debug imported functions
console.log({ addTransaction, getTransactions });

// Routes for transactions
router.route('/').get(protect, getTransactions).post(protect, addTransaction);

module.exports = router;
