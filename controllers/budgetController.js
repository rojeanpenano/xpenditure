const Budget = require('../models/Budget');

// Set or update a budget
const setBudget = async (req, res) => {
    try {
        const { userId, amount, categories } = req.body;

        if (!userId || !amount || !categories) {
            return res.status(400).json({ message: 'All fields are required' });
        }

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

// Get a user's budget
const viewBudget = async (req, res) => {
    try {
        const { userId } = req.params;

        const budget = await Budget.findOne({ userId });
        if (!budget) return res.status(404).json({ message: 'Budget not found' });

        res.json(budget);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Optimize budget using dynamic programming
const optimizeBudget = async (req, res) => {
    try {
        const { budgetLimit, transactions } = req.body;

        if (!budgetLimit || !transactions || !Array.isArray(transactions)) {
            return res.status(400).json({ message: 'Invalid input' });
        }

        const dp = Array(transactions.length + 1).fill(0).map(() => Array(budgetLimit + 1).fill(0));

        for (let i = 1; i <= transactions.length; i++) {
            for (let w = 1; w <= budgetLimit; w++) {
                if (transactions[i - 1].amount <= w) {
                    dp[i][w] = Math.max(
                        transactions[i - 1].amount + dp[i - 1][w - transactions[i - 1].amount],
                        dp[i - 1][w]
                    );
                } else {
                    dp[i][w] = dp[i - 1][w];
                }
            }
        }

        res.json({ message: 'Budget optimized', optimizedUsage: dp[transactions.length][budgetLimit] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { setBudget, viewBudget, optimizeBudget };
