const mongoose = require('mongoose');

const budgetSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        category: {
            type: String,
            required: [true, 'Please add a category'],
        },
        amount: {
            type: Number,
            required: [true, 'Please add an amount'],
        },
        currency: {
            type: String,
            default: 'PHP',
        },
        startDate: {
            type: Date,
            required: [true, 'Please add a start date'],
        },
        endDate: {
            type: Date,
            required: [true, 'Please add an end date'],
        },
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields
    }
);

module.exports = mongoose.model('Budget', budgetSchema);
