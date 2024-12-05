const SharedExpense = require('../models/SharedExpense');

// Calculate settlements using Divide and Conquer
const calculateSettlements = async (req, res) => {
    try {
        const { expenses } = req.body;

        if (!expenses || !Array.isArray(expenses)) {
            return res.status(400).json({ message: 'Expenses must be an array' });
        }

        // Helper function to calculate settlements
        const divideAndConquer = (expenses) => {
            // Base case: if only one expense, calculate directly
            if (expenses.length === 1) {
                const expense = expenses[0];
                const owedPerPerson = expense.amount / expense.sharedAmong.length;
                return expense.sharedAmong.map((share) => ({
                    from: expense.paidBy.userId,
                    to: share.userId,
                    amount: owedPerPerson,
                }));
            }

            // Divide the array into two halves
            const mid = Math.floor(expenses.length / 2);
            const leftSettlements = divideAndConquer(expenses.slice(0, mid));
            const rightSettlements = divideAndConquer(expenses.slice(mid));

            // Merge the two settlements
            return [...leftSettlements, ...rightSettlements];
        };

        // Call the divideAndConquer function on the expenses
        const settlements = divideAndConquer(expenses);

        res.status(200).json({ message: 'Settlements calculated', settlements });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { calculateSettlements };