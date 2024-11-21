const express = require('express');
const {
    addTransaction,
    getTransactions,
    calculateSettlements,
} = require('../controllers/transactionController');
const router = express.Router();

// Route to add a new transaction
router.post('/', addTransaction);

// Route to get all transactions for a user
router.get('/:userId', getTransactions);

// Route to calculate settlements for shared expenses
router.post('/calculateSettlements', calculateSettlements);

module.exports = router;
