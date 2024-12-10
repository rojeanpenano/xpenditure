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

// @desc Calculate remaining budget dynamically
const calculateRemainingBudget = async (userId, budget) => {
    const expenses = await Transaction.find({
        user: userId,
        type: 'expense',
        date: { $gte: budget.startDate, $lte: budget.endDate },
    });

    const totalSpent = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    return budget.amount - totalSpent; // Remaining amount
};

// @desc Get remaining budget for a budget
// @route GET /api/budgets/:id/remaining
// @access Private
const getRemainingBudget = asyncHandler(async (req, res) => {
    const budget = await Budget.findById(req.params.id);

    if (!budget) {
        res.status(404);
        throw new Error('Budget not found');
    }

    const remaining = await calculateRemainingBudget(req.user.id, budget);
    res.status(200).json({ remaining });
});

// @desc Add a new budget
// @route POST /api/budgets
// @access Private
const setBudget = asyncHandler(async (req, res) => {
    const { amount, startDate, endDate } = req.body;

    if (!amount || !startDate || !endDate) {
        res.status(400);
        throw new Error('Please provide amount, start date, and end date.');
    }

    const budget = await Budget.create({
        user: req.user.id,
        amount,
        startDate,
        endDate,
    });

    res.status(201).json(budget);
});

module.exports = { getBudgets, setBudget, getRemainingBudget, calculateRemainingBudget };