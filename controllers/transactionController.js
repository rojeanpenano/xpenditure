const Transaction = require('../models/Transaction');
const mongoose = require('mongoose');

// Add Transaction
const addTransaction = async (req, res) => {
    try {
        const { userId, amount, category, type, sharedWith } = req.body;

        // Validate userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid userId' });
        }

        // Create and save the transaction
        const transaction = new Transaction({
            userId,
            amount,
            category,
            type,
            sharedWith,
        });
        await transaction.save();

        // Return success response
        res.status(201).json({ message: 'Transaction added', transaction });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Transactions for a Specific User
const getTransactions = async (req, res) => {
    try {
        const { userId } = req.params;

        // Validate userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid userId' });
        }

        // Retrieve transactions
        const transactions = await Transaction.find({ userId }).populate(
            'sharedWith',
            'name email'
        );
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Calculate Settlements (Divide-and-Conquer Algorithm)
const calculateSettlements = async (req, res) => {
    try {
        const { sharedWith, totalAmount } = req.body;

        if (!sharedWith || sharedWith.length === 0) {
            return res.status(400).json({ message: 'No participants provided' });
        }

        // Divide the amount equally
        const perPerson = totalAmount / sharedWith.length;
        const settlements = sharedWith.map((user) => ({
            payer: user,
            amount: perPerson,
        }));

        res.status(200).json({ message: 'Settlements calculated', settlements });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addTransaction, getTransactions, calculateSettlements };
