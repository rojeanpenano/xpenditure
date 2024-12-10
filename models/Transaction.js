const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        date: {
            type: Date,
            required: [true, 'Please add a date'],
        },
        description: {
            type: String,
            required: [true, 'Please add a description'],
        },
        category: {
            type: String,
            required: [true, 'Please add a category'],
        },
        amount: {
            type: Number,
            required: [true, 'Please add an amount'],
        },
        type: {
            type: String,
            required: [true, 'Please specify the type (income or expense)'],
            enum: ['income', 'expense'], // Allow only these two types
        },
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields
    }
);

module.exports = mongoose.model('Transaction', transactionSchema);
