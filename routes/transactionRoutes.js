const express = require('express');
const { body } = require('express-validator');
const {
    addTransaction,
    getTransactions,
    categorizeTransactions,
    monthlySummary,
} = require('../controllers/transactionController');

const router = express.Router();

// Add a new transaction with validation
router.post(
    '/',
    [
        body('userId').notEmpty().withMessage('User ID is required'),
        body('amount').isNumeric().withMessage('Amount must be a number'),
        body('category').notEmpty().withMessage('Category is required'),
        body('type').isIn(['income', 'expense']).withMessage('Type must be income or expense'),
    ],
    addTransaction
);

// Other routes
router.get('/:userId', getTransactions);
router.post('/categorize', categorizeTransactions);
router.get('/summary/:userId/:year/:month', monthlySummary);

module.exports = router;
