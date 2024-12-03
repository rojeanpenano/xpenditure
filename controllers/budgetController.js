const Budget = require('../models/Budget');
const Transaction = require('../models/Transaction');

// Cache for storing intermediate results (Dynamic Programming)
const expenseCache = {};

/**
 * Set a new budget
 * Greedy Algorithm: Always prioritize the latest budget.
 */
const setBudget = async (req, res) => {
    try {
        const { amount, startDate, endDate } = req.body;

        if (!amount || !startDate || !endDate) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const budget = new Budget({
            userId: req.user.id,
            amount,
            startDate,
            endDate,
        });

        await budget.save();
        res.status(201).json(budget);
    } catch (error) {
        console.error('Error setting budget:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

/**
 * Get the current budget and expense summary
 * Dynamic Programming: Cache and reuse expense totals for efficiency.
 */
const getBudgetSummary = async (req, res) => {
    try {
        const budget = await Budget.findOne({ userId: req.user.id }).sort({ createdAt: -1 });

        if (!budget) {
            return res.status(404).json({ message: 'No budget found' });
        }

        const cacheKey = `${req.user.id}-${budget.startDate}-${budget.endDate}`;
        if (expenseCache[cacheKey]) {
            console.log('Using cached results');
            return res.status(200).json(expenseCache[cacheKey]);
        }

        // Calculate total expenses using Divide and Conquer
        const expenses = await Transaction.aggregate([
            {
                $match: {
                    userId: req.user.id,
                    date: { $gte: new Date(budget.startDate), $lte: new Date(budget.endDate) },
                    type: 'expense',
                },
            },
            {
                $group: {
                    _id: null,
                    totalExpenses: { $sum: '$amount' },
                },
            },
        ]);

        const totalExpenses = expenses.length > 0 ? expenses[0].totalExpenses : 0;
        const remainingBudget = budget.amount - totalExpenses;

        const result = {
            budget,
            totalExpenses,
            remainingBudget,
        };

        expenseCache[cacheKey] = result; // Cache the result
        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching budget summary:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

module.exports = {
    setBudget,
    getBudgetSummary,
};
