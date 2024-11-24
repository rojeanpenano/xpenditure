const Transaction = require('../models/Transaction');

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

// Categorize transactions using a greedy algorithm
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
                    break; // Stop once the best match is found
                }
            }

            return { ...transaction, suggestedCategory };
        });

        res.json({ message: 'Transactions categorized successfully', categorizedTransactions });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addTransaction, getTransactions, categorizeTransactions };
