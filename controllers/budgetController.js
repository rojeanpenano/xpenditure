const asyncHandler = require('express-async-handler');

// Temporary in-memory storage for budgets (Replace with database logic in production)
const budgets = [];

// @desc    Get all budgets for a user
// @route   GET /budgets
// @access  Private
exports.getBudgets = asyncHandler(async (req, res) => {
    try {
        const userBudgets = budgets.filter(budget => budget.userId === req.user.id);
        res.status(200).json(userBudgets || []); // Return an empty array if no budgets exist
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch budgets' });
    }
});

// @desc    Set or update a budget for a specific category
// @route   POST /budgets
// @access  Private
exports.setBudget = asyncHandler(async (req, res) => {
    const { category, amount } = req.body;

    if (!category || !amount) {
        res.status(400).json({ message: 'Please provide both category and amount' });
        return;
    }

    try {
        const existingBudget = budgets.find(
            budget => budget.userId === req.user.id && budget.category === category
        );

        if (existingBudget) {
            existingBudget.amount = amount; // Update the existing budget
        } else {
            budgets.push({
                userId: req.user.id,
                category,
                amount,
            });
        }

        res.status(200).json({ message: 'Budget set successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to set budget' });
    }
});
