const asyncHandler = require('express-async-handler');
const SharedExpense = require('../models/SharedExpense');

// @desc Get all shared expenses for the logged-in user
// @route GET /api/shared-expenses
// @access Private
const getSharedExpenses = asyncHandler(async (req, res) => {
    const expenses = await SharedExpense.find({ user: req.user.id });
    res.status(200).json(expenses);
});

// @desc Add a new shared expense
// @route POST /api/shared-expenses
// @access Private
const addSharedExpense = asyncHandler(async (req, res) => {
    const { name, amount, participants, date } = req.body;

    console.log('Request Body:', req.body); // Debugging request payload

    if (!name || !amount || !participants || participants.length === 0 || !date) {
        res.status(400);
        throw new Error('Please provide all required fields');
    }

    try {
        const perParticipant = (amount / participants.length).toFixed(2);

        const expense = await SharedExpense.create({
            user: req.user.id,
            name,
            amount,
            participants,
            date,
            perParticipant,
        });

        res.status(201).json(expense);
    } catch (error) {
        console.error('Error saving shared expense:', error.message); // Debugging server-side errors
        res.status(500);
        throw new Error('Failed to save shared expense');
    }
});

module.exports = { getSharedExpenses, addSharedExpense };
