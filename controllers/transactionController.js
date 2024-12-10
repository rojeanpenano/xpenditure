const asyncHandler = require('express-async-handler');
const Transaction = require('../models/Transaction');
const Budget = require('../models/Budget');
const { calculateRemainingBudget } = require('./budgetController');

// @desc Add a new transaction
// @route POST /api/transactions
// @access Private
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

    if (type === 'expense') {
        const activeBudget = await Budget.findOne({
            user: req.user.id,
            startDate: { $lte: new Date(date) },
            endDate: { $gte: new Date(date) },
        });

        if (activeBudget) {
            const remaining = await calculateRemainingBudget(req.user.id, activeBudget);
            activeBudget.remaining = remaining; // Update remaining budget
            await activeBudget.save();
        }
    }

    res.status(201).json(transaction);
});

// @desc Get all transactions
// @route GET /api/transactions
// @access Private
const getTransactions = asyncHandler(async (req, res) => {
    const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 });
    res.status(200).json(transactions);
});

module.exports = { addTransaction, getTransactions };
