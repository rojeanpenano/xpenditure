const Transaction = require('../models/Transaction'); // Import the Transaction model

/**
 * Add a new transaction
 * @route POST /api/transactions
 * @access Private
 */
const addTransaction = async (req, res) => {
    try {
        // Extract transaction details from the request body
        const { date, description, category, amount, type } = req.body;

        // Validate that all required fields are provided
        if (!date || !description || !category || !amount || !type) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Ensure the user ID is included (extracted from the token)
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Unauthorized. Please log in again.' });
        }

        // Create a new transaction object
        const transaction = new Transaction({
            userId: req.user.id, // Attach the user ID to the transaction
            date,
            description,
            category,
            amount,
            type,
        });

        // Save the transaction to the database
        await transaction.save();

        // Send a success response
        res.status(201).json(transaction);
    } catch (error) {
        // Log any server-side error and respond with a 500 status
        console.error('Error adding transaction:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

/**
 * Fetch all transactions for the logged-in user
 * @route GET /api/transactions
 * @access Private
 */
const getTransactions = async (req, res) => {
    try {
        // Ensure the user ID is included (extracted from the token)
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Unauthorized. Please log in again.' });
        }

        // Fetch all transactions for the logged-in user
        const transactions = await Transaction.find({ userId: req.user.id }).sort({ date: -1 });

        // Send the transactions as a response
        res.status(200).json(transactions);
    } catch (error) {
        // Log any server-side error and respond with a 500 status
        console.error('Error fetching transactions:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

module.exports = {
    addTransaction,
    getTransactions,
};