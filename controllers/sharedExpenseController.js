const asyncHandler = require('express-async-handler');
const SharedExpense = require('../models/SharedExpense');

// Fetch shared expenses for a user
const getSharedExpenses = asyncHandler(async (req, res) => {
    const sharedExpenses = await SharedExpense.find({ user: req.user.id });
    if (!sharedExpenses) {
        res.status(404);
        throw new Error('No shared expenses found');
    }
    res.status(200).json(sharedExpenses);
});

// Add a new shared expense
const addSharedExpense = asyncHandler(async (req, res) => {
    const { description, amount, participants, date } = req.body;

    if (!description || !amount || !participants || !date) {
        res.status(400);
        throw new Error('Please provide all required fields');
    }

    const sharedExpense = await SharedExpense.create({
        user: req.user.id,
        description,
        amount,
        participants,
        date,
    });

    res.status(201).json(sharedExpense);
});

module.exports = {
    getSharedExpenses,
    addSharedExpense,
};
