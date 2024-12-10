const asyncHandler = require('express-async-handler');
const Budget = require('../models/Budget');
const Transaction = require('../models/Transaction');

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
    const { category, amount, currency = 'PHP', startDate, endDate } = req.body;

    // Validate required fields
    if (!category || !amount || !startDate || !endDate) {
        res.status(400);
        throw new Error('Please provide category, amount, start date, and end date.');
    }

    // Create and save the new budget
    const budget = await Budget.create({
        user: req.user.id,
        category,
        amount,
        currency,
        startDate,
        endDate, // Include date range for the budget
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

    // Fetch transactions for the category within the budget's date range
    const transactions = await Transaction.find({
        user: req.user.id,
        category: budget.category,
        date: { $gte: budget.startDate, $lte: budget.endDate }, // Filter by budget's date range
    });

    // Use a dynamic programming approach to calculate the remaining budget
    const remaining = transactions.reduce((acc, tx) => {
        return tx.type === 'expense' ? acc - tx.amount : acc + tx.amount;
    }, budget.amount);

    res.status(200).json({ remaining });
});

module.exports = { getBudgets, setBudget, getRemainingBudget };
