const express = require('express');
const {
    addTransaction,
    getTransactions,
    categorizeTransactions,
} = require('../controllers/transactionController');

const router = express.Router();

// Add a new transaction
router.post('/', addTransaction);

// Get transactions for a user
router.get('/:userId', getTransactions);

// Categorize transactions
router.post('/categorize', categorizeTransactions);

module.exports = router;
