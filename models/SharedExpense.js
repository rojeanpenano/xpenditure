const mongoose = require('mongoose');

// Define the Shared Expense schema
const SharedExpenseSchema = new mongoose.Schema(
    {
        description: { type: String, required: true }, // Description of the shared expense
        amount: { type: Number, required: true }, // Total amount of the shared expense
        paidBy: {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Who paid
            amount: { type: Number, required: true }, // How much they paid
        },
        sharedAmong: [
            {
                userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User sharing
                share: { type: Number, required: true }, // Share of the total amount
            },
        ],
    },
    { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

module.exports = mongoose.model('SharedExpense', SharedExpenseSchema);
