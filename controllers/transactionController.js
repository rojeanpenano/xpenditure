const asyncHandler = require('express-async-handler');
const Transaction = require('../models/Transaction');

// Add a new transaction
const addTransaction = asyncHandler(async (req, res) => {
    const { date, description, category, amount, type } = req.body;

    if (!date || !description || !amount || !type) {
        res.status(400);
        throw new Error('Please provide all required fields');
    }

    const transaction = await Transaction.create({
        user: req.user.id,
        date,
        description,
        category,
        amount,
        type,
    });

    res.status(201).json(transaction);
});

// Get all transactions
const getTransactions = asyncHandler(async (req, res) => {
    const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 });
    res.status(200).json(transactions);
});

module.exports = {
    addTransaction,
    getTransactions,
};
