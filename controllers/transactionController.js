const Transaction = require('../models/Transaction'); // Import the Transaction model

// Add a new transaction
const addTransaction = async (req, res) => {
    try {
        const { userId, amount, category, type, description } = req.body;

        // Validate the required fields
        if (!userId || !amount || !category || !type) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create and save the transaction
        const transaction = new Transaction({ userId, amount, category, type, description });
        await transaction.save();

        res.status(201).json({ message: 'Transaction added successfully', transaction });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve transactions for a user
const getTransactions = async (req, res) => {
    try {
        const { userId } = req.params;

        // Validate userId
        if (!userId) return res.status(400).json({ message: 'User ID is required' });

        // Retrieve transactions for the user
        const transactions = await Transaction.find({ userId });

        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Categorize transactions
const categorizeTransactions = async (req, res) => {
    try {
        const { transactions } = req.body;

        if (!transactions || !Array.isArray(transactions)) {
            return res.status(400).json({ message: 'Transactions must be an array' });
        }

        // Predefined category mapping
        const categoryMapping = {
            groceries: 'Food',
            rent: 'Housing',
            gas: 'Transport',
            electricity: 'Utilities',
        };

        // Categorize each transaction
        const categorizedTransactions = transactions.map((transaction) => {
            let suggestedCategory = 'Miscellaneous'; // Default category

            for (const keyword in categoryMapping) {
                if (transaction.description?.toLowerCase().includes(keyword)) {
                    suggestedCategory = categoryMapping[keyword];
                    break;
                }
            }

            return { ...transaction, suggestedCategory };
        });

        res.json({ message: 'Transactions categorized successfully', categorizedTransactions });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Calculate monthly spending summary using a Greedy Algorithm
const monthlySummary = async (req, res) => {
    try {
        const { userId, year, month } = req.params;

        // Validate inputs
        if (!userId || !year || !month) {
            return res.status(400).json({ message: 'User ID, year, and month are required' });
        }

        // Fetch transactions for the given user, year, and month
        const transactions = await Transaction.find({
            userId,
            date: {
                $gte: new Date(`${year}-${month}-01`),
                $lt: new Date(`${year}-${month}-31`),
            },
        });

        if (transactions.length === 0) {
            return res.status(404).json({ message: 'No transactions found for the specified period' });
        }

        // Greedy Algorithm to group by categories and sum amounts
        const summary = transactions.reduce((acc, transaction) => {
            const category = transaction.category;
            if (!acc[category]) {
                acc[category] = 0;
            }
            acc[category] += transaction.amount;
            return acc;
        }, {});

        res.status(200).json({ message: 'Monthly summary calculated', summary });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addTransaction, getTransactions, categorizeTransactions, monthlySummary };
