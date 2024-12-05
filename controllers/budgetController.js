const asyncHandler = require('express-async-handler');
const Budget = require('../models/Budget');

// @desc Get budgets for the authenticated user
// @route GET /budgets
// @access Private
const getBudgets = asyncHandler(async (req, res) => {
    const budgets = await Budget.find({ user: req.user.id }); // Find budgets for the logged-in user
    res.status(200).json(budgets);
});

// @desc Add a new budget
// @route POST /budgets
// @access Private
const setBudget = asyncHandler(async (req, res) => {
    const { category, amount } = req.body;

    if (!category || !amount) {
        res.status(400);
        throw new Error('Please provide both category and amount.');
    }

    const budget = await Budget.create({
        user: req.user.id, // Associate budget with the logged-in user
        category,
        amount,
    });

    res.status(201).json(budget);
});

module.exports = { getBudgets, setBudget };
