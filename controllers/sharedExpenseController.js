const asyncHandler = require('express-async-handler');
const SharedExpense = require('../models/SharedExpense');

// @desc Get all shared expenses for the logged-in user
// @route GET /api/shared-expenses
// @access Private
const getSharedExpenses = asyncHandler(async (req, res) => {
    const expenses = await SharedExpense.find({ user: req.user.id }); // Fetch expenses for the user
    res.status(200).json(expenses);
});

// @desc Add a new shared expense
// @route POST /api/shared-expenses
// @access Private
const addSharedExpense = asyncHandler(async (req, res) => {
    const { name, amount, participants } = req.body;

    if (!name || !amount || !participants || participants.length === 0) {
        res.status(400);
        throw new Error('Please provide all required fields');
    }

    const expense = await SharedExpense.create({
        user: req.user.id,
        name,
        amount,
        participants,
    });

    res.status(201).json(expense);
});

module.exports = {
    getSharedExpenses,
    addSharedExpense,
};
