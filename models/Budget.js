const mongoose = require('mongoose'); // Import mongoose

const budgetSchema = mongoose.Schema({
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
}, {
    timestamps: true,
});

module.exports = mongoose.model('Budget', budgetSchema); // Export the Budget model
