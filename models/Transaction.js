const mongoose = require('mongoose');

// Define the Transaction schema
const TransactionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId, // References a User ID
            ref: 'User',
            required: true, // Transaction must belong to a user
        },
        amount: { type: Number, required: true }, // Transaction amount
        category: { type: String, required: true }, // Transaction category
        type: { type: String, enum: ['income', 'expense'], required: true }, // Type of transaction
        description: { type: String }, // Additional details about the transaction
        date: { type: Date, default: Date.now }, // Date of the transaction
    },
    { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

module.exports = mongoose.model('Transaction', TransactionSchema);
