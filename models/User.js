// Import Mongoose to define schemas
const mongoose = require('mongoose');

// Define the User schema
const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true }, // User's full name
        email: { type: String, required: true, unique: true }, // Unique email address
        password: { type: String, required: true }, // Hashed password
        role: { type: String, enum: ['user', 'admin'], default: 'user' },
        resetPasswordToken: { type: String }, // Token for password reset
        resetPasswordExpires: { type: Date }, // Expiration time for the token
    },
    { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

module.exports = mongoose.model('User', UserSchema);
