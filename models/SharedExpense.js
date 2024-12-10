const mongoose = require('mongoose');

const sharedExpenseSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User', // Reference the user who added the expense
        },
        name: {
            type: String,
            required: [true, 'Please add an expense name'],
        },
        amount: {
            type: Number,
            required: [true, 'Please add the total amount'],
        },
        participants: {
            type: [String], // List of participants as an array of names
            required: [true, 'Please add participants'],
        },
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields
    }
);

module.exports = mongoose.model('SharedExpense', sharedExpenseSchema);