const mongoose = require('mongoose');

const sharedExpenseSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
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
            type: [String],
            required: [true, 'Please add participants'],
        },
        date: {
            type: Date, // Ensure type is Date
            required: [true, 'Please add the expense date'],
        },
        perParticipant: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('SharedExpense', sharedExpenseSchema);