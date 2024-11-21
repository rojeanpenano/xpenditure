const Budget = require('../models/Budget'); // Import the Budget model
const mongoose = require('mongoose'); // Import mongoose for ObjectId validation

// Set a Budget
const setBudget = async (req, res) => {
    try {
        // Extract userId from the URL or request body
        const userId = req.params.userId || req.body.userId;
        const { amount, categories } = req.body;

        // Validate userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid userId' });
        }

        // Create or update the budget for the user
        const budget = await Budget.findOneAndUpdate(
            { userId },
            { userId, amount, categories },
            { new: true, upsert: true } // Upsert creates a new entry if none exists
        );

        res.status(201).json({ message: 'Budget set successfully', budget });
    } catch (error) {
        // Handle errors that occur during the process
        res.status(500).json({ message: error.message });
    }
};

// View Budget Details
const viewBudget = async (req, res) => {
    try {
        // Extract userId from the URL parameters
        const { userId } = req.params;

        // Validate userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid userId' });
        }

        // Find the budget associated with the userId
        const budget = await Budget.findOne({ userId });

        // If no budget exists, return an error
        if (!budget) {
            return res.status(404).json({ message: 'No budget found for this user' });
        }

        res.json(budget); // Respond with the retrieved budget
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Optimize Budget (Dynamic Programming)
const optimizeBudget = async (req, res) => {
    try {
        // Extract budgetLimit and transactions from the request body
        const { budgetLimit, transactions } = req.body;

        // Validate input
        if (!budgetLimit || !Array.isArray(transactions)) {
            return res
                .status(400)
                .json({ message: 'Invalid input: budgetLimit and transactions are required' });
        }

        // Dynamic Programming: Subset Sum Optimization
        const dp = Array(budgetLimit + 1).fill(0); // Initialize DP array

        // Fill the DP array based on transaction amounts
        for (const transaction of transactions) {
            for (let j = budgetLimit; j >= transaction.amount; j--) {
                dp[j] = Math.max(dp[j], dp[j - transaction.amount] + transaction.amount);
            }
        }

        // Respond with the maximum optimized budget usage
        res.json({
            message: 'Optimized budget usage calculated',
            optimizedUsage: dp[budgetLimit],
        });
    } catch (error) {
        // Handle errors that occur during the process
        res.status(500).json({ message: error.message });
    }
};

module.exports = { setBudget, viewBudget, optimizeBudget }; // Export all functions
