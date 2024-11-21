// Import mongoose to define the schema
const mongoose = require('mongoose');

// Define the Transaction schema
const TransactionSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        amount: { type: Number, required: true },
        category: { type: String, required: true },
        type: { type: String, enum: ['income', 'expense'], required: true },
        date: { type: Date, default: Date.now },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Export the Transaction model
module.exports = mongoose.model('Transaction', TransactionSchema);
