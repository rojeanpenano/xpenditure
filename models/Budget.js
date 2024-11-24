const mongoose = require('mongoose');

// Define the Budget schema
const BudgetSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId, // References a User ID
            ref: 'User',
            required: true,
        },
        amount: { type: Number, required: true }, // Total budget
        categories: [
            {
                category: { type: String, required: true }, // Category name
                allocated: { type: Number, required: true }, // Allocated amount
            },
        ],
    },
    { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

module.exports = mongoose.model('Budget', BudgetSchema);
