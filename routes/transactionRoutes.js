const express = require('express');
const { addTransaction, getTransactions } = require('../controllers/transactionController');
const router = express.Router();

// Route to add a new transaction
router.post('/', addTransaction);

// Route to get all transactions for a user
router.get('/:userId', getTransactions);

module.exports = router;
