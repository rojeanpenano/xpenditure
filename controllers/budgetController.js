const asyncHandler = require('express-async-handler');
const Budget = require('../models/Budget');

// @desc Get budgets for the authenticated user
// @route GET /api/budgets
// @access Private
const getBudgets = asyncHandler(async (req, res) => {
    console.log('Fetching budgets for user:', req.user.id); // Log user ID
    const budgets = await Budget.find({ user: req.user.id });
    console.log('Budgets fetched:', budgets); // Log fetched budgets

    res.status(200).json(budgets);
});

// @desc Add a new budget
// @route POST /api/budgets
// @access Private
const setBudget = asyncHandler(async (req, res) => {
    const { category, amount, currency = 'PHP' } = req.body;

    if (!category || !amount) {
        res.status(400);
        throw new Error('Please provide category and amount.');
    }

    const budget = await Budget.create({
        user: req.user.id,
        category,
        amount,
        currency,
    });

    res.status(201).json(budget);
});

module.exports = { getBudgets, setBudget };