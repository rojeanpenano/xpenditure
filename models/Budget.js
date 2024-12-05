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
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Budget', budgetSchema);
