const Transaction = require('../models/Transaction');

// Add Transaction
const addTransaction = async (req, res) => {
    try {
        const { userId, amount, category, type } = req.body;
        const transaction = new Transaction({ userId, amount, category, type });
        await transaction.save();
        res.status(201).json({ message: 'Transaction added', transaction });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Transactions
const getTransactions = async (req, res) => {
    try {
        const { userId } = req.params;
        const transactions = await Transaction.find({ userId });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addTransaction, getTransactions };
