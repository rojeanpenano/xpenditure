const mongoose = require('mongoose'); // Import mongoose

const sharedExpenseSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User', // Reference the user who added the expense
        },
        name: {
            type: String,
            required: [true, 'Please add an expense name'], // Name of the shared expense
        },
        amount: {
            type: Number,
            required: [true, 'Please add the total amount'], // Total amount for the shared expense
        },
        participants: {
            type: [String], // List of participants as an array of names
            required: [true, 'Please add participants'], // Ensure at least one participant is added
        },
        date: {
            type: Date,
            required: [true, 'Please add the expense date'], // Date of the shared expense
        },
        perParticipant: {
            type: Number, // Amount each participant owes
            required: true,
            default: 0, // Default value, calculated in the backend
        },
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields
    }
);

module.exports = mongoose.model('SharedExpense', sharedExpenseSchema); // Export the SharedExpense model
