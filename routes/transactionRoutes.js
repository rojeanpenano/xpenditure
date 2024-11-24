const express = require('express');
const {
    addTransaction,
    getTransactions,
    categorizeTransactions,
    monthlySummary,
} = require('../controllers/transactionController');

const router = express.Router();

// Add a new transaction
router.post('/', addTransaction);

// Get transactions for a user
router.get('/:userId', getTransactions);

// Categorize transactions
router.post('/categorize', categorizeTransactions);

// Get monthly spending summary
router.get('/summary/:userId/:year/:month', monthlySummary);

module.exports = router;
