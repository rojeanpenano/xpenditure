const asyncHandler = require('express-async-handler');
const Budget = require('../models/Budget');
const Transaction = require('../models/Transaction');

// @desc Get budgets for the authenticated user
// @route GET /api/budgets
// @access Private
const getBudgets = asyncHandler(async (req, res) => {
    const budgets = await Budget.find({ user: req.user.id });
    res.status(200).json(budgets);
});

// @desc Add a new budget
// @route POST /api/budgets
// @access Private
const setBudget = asyncHandler(async (req, res) => {
    const { category, amount, currency = 'PHP', startDate, endDate } = req.body;

    if (!category || !amount || !startDate || !endDate) {
        res.status(400);
        throw new Error('Please provide category, amount, start date, and end date.');
    }

    const budget = await Budget.create({
        user: req.user.id,
        category,
        amount,
        currency,
        startDate,
        endDate,
    });

    res.status(201).json(budget);
});

// @desc Calculate remaining budget for a category
// @route GET /api/budgets/:id/remaining
// @access Private
const getRemainingBudget = asyncHandler(async (req, res) => {
    const budget = await Budget.findById(req.params.id);

    if (!budget) {
        res.status(404);
        throw new Error('Budget not found');
    }

    const transactions = await Transaction.find({
        user: req.user.id,
        category: budget.category,
        date: { $gte: budget.startDate, $lte: budget.endDate },
    });

    const remaining = transactions.reduce((acc, tx) => {
        return tx.type === 'expense' ? acc - tx.amount : acc + tx.amount;
    }, budget.amount);

    res.status(200).json({ remaining });
});

// Debug exported functions
console.log({ getBudgets, setBudget, getRemainingBudget });
module.exports = { getBudgets, setBudget, getRemainingBudget };
