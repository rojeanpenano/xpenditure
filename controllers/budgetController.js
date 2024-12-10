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
    const { amount, currency = 'PHP', startDate, endDate } = req.body;

    if (!amount || !startDate || !endDate) {
        res.status(400);
        throw new Error('Please provide amount, start date, and end date.');
    }

    const budget = await Budget.create({
        user: req.user.id,
        amount,
        currency,
        startDate,
        endDate,
    });

    res.status(201).json(budget);
});

// @desc Calculate remaining budget
// @route GET /api/budgets/:id/remaining
// @access Private
const getRemainingBudget = asyncHandler(async (req, res) => {
    const budget = await Budget.findById(req.params.id);

    if (!budget) {
        res.status(404);
        throw new Error('Budget not found');
    }

    // Fetch all expenses for the user within the budget's date range
    const expenses = await Transaction.find({
        user: req.user.id,
        type: 'expense',
        date: { $gte: budget.startDate, $lte: budget.endDate },
    });

    // Calculate the remaining amount
    const totalSpent = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    const remaining = budget.amount - totalSpent;

    res.status(200).json({ remaining });
});

module.exports = { getBudgets, setBudget, getRemainingBudget };
