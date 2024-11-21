const Transaction = require('../models/Transaction');
const mongoose = require('mongoose'); // To validate ObjectId

// Add Transaction
const addTransaction = async (req, res) => {
    try {
        const { userId, amount, category, type } = req.body;

        // Check if the userId is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid userId' });
        }

        // Create and save the transaction
        const transaction = new Transaction({ userId, amount, category, type });
        await transaction.save();

        // Return a success response
        res.status(201).json({ message: 'Transaction added', transaction });
    } catch (error) {
        // Handle errors during transaction creation
        res.status(500).json({ message: error.message });
    }
};

// Get Transactions for a Specific User
const getTransactions = async (req, res) => {
    try {
        const { userId } = req.params;

        // Check if the userId is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid userId' });
        }

        // Retrieve all transactions for the given userId
        const transactions = await Transaction.find({ userId });

        // Return the transactions in the response
        res.json(transactions);
    } catch (error) {
        // Handle errors during data retrieval
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addTransaction, getTransactions };
