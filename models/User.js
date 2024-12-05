const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// User schema definition
const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        cash: {
            type: Number,
            default: 0, // Default balance for cash is zero
        },
        card: {
            type: Number,
            default: 0, // Default balance for card is zero
        },
        resetPasswordToken: String,
        resetPasswordExpires: Date,
    },
    {
        timestamps: true, // Automatically create createdAt and updatedAt fields
    }
);

// Password hashing before saving the user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('User', userSchema);