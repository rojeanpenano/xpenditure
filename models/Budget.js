// Import mongoose to define the schema
const mongoose = require('mongoose');

// Define the Budget schema
const BudgetSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId, // Must be a valid MongoDB ObjectId
            ref: 'User', // Reference to the User model
            required: true,
        },
        amount: { type: Number, required: true }, // Total budget amount
        categories: [
            {
                category: { type: String, required: true },
                allocated: { type: Number, required: true }, // Allocated amount for this category
            },
        ],
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Export the Budget model
module.exports = mongoose.model('Budget', BudgetSchema);
