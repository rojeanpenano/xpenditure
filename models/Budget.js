const mongoose = require('mongoose');

// Define the Budget schema
const BudgetSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId, // References a User ID
            ref: 'User',
            required: true, // Budget must belong to a user
        },
        amount: { type: Number, required: true }, // Total budget amount
        categories: [
            {
                category: { type: String, required: true }, // Category name
                allocated: { type: Number, required: true }, // Allocated amount for this category
            },
        ],
    },
    { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

module.exports = mongoose.model('Budget', BudgetSchema);
