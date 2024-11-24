const Budget = require('../models/Budget'); // Budget model

// Set or update a user's budget
const setBudget = async (req, res) => {
    try {
        const { userId, amount, categories } = req.body;

        // Validate inputs
        if (!userId || !amount || !categories) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Update the budget if it exists; otherwise, create a new one
        const budget = await Budget.findOneAndUpdate(
            { userId },
            { amount, categories },
            { new: true, upsert: true } // Create if not found
        );

        res.status(201).json({ message: 'Budget set successfully', budget });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve a user's budget
const getBudget = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find the user's budget
        const budget = await Budget.findOne({ userId });
        if (!budget) {
            return res.status(404).json({ message: 'Budget not found' });
        }

        res.status(200).json(budget);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Optimize budget using dynamic programming
const optimizeBudget = async (req, res) => {
    try {
        const { budgetLimit, expenses } = req.body;

        // Validate inputs
        if (!budgetLimit || !expenses || !Array.isArray(expenses)) {
            return res.status(400).json({ message: 'Invalid input' });
        }

        // Dynamic Programming Algorithm for Budget Optimization
        const dp = Array(expenses.length + 1)
            .fill(0)
            .map(() => Array(budgetLimit + 1).fill(0));

        for (let i = 1; i <= expenses.length; i++) {
            for (let w = 1; w <= budgetLimit; w++) {
                if (expenses[i - 1].cost <= w) {
                    dp[i][w] = Math.max(
                        expenses[i - 1].cost + dp[i - 1][w - expenses[i - 1].cost],
                        dp[i - 1][w]
                    );
                } else {
                    dp[i][w] = dp[i - 1][w];
                }
            }
        }

        res.status(200).json({
            message: 'Budget optimized',
            optimizedAmount: dp[expenses.length][budgetLimit],
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { setBudget, getBudget, optimizeBudget };
