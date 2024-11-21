const Budget = require('../models/Budget');
const mongoose = require('mongoose');

// Set a Budget
const setBudget = async (req, res) => {
    try {
        const { userId, amount, categories } = req.body;

        // Validate userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid userId' });
        }

        // Create a new budget or update an existing one
        const budget = await Budget.findOneAndUpdate(
            { userId },
            { amount, categories },
            { new: true, upsert: true }
        );

        res.status(201).json({ message: 'Budget set successfully', budget });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// View Budget Details
const viewBudget = async (req, res) => {
    try {
        const { userId } = req.params;

        // Validate userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid userId' });
        }

        // Retrieve the budget for the user
        const budget = await Budget.findOne({ userId });

        if (!budget) {
            return res.status(404).json({ message: 'No budget found for this user' });
        }

        res.json(budget);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Optimize Budget (Dynamic Programming Algorithm)
const optimizeBudget = async (req, res) => {
    try {
        const { budgetLimit, transactions } = req.body;

        // Dynamic Programming for subset sum optimization
        const dp = Array(budgetLimit + 1).fill(0);

        for (const transaction of transactions) {
            for (let j = budgetLimit; j >= transaction.amount; j--) {
                dp[j] = Math.max(dp[j], dp[j - transaction.amount] + transaction.amount);
            }
        }

        res.json({
            message: 'Optimized budget usage calculated',
            optimizedUsage: dp[budgetLimit],
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { setBudget, viewBudget, optimizeBudget };
