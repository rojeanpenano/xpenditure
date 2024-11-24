// Import Mongoose to define schemas
const mongoose = require('mongoose');

// Define the User schema
const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true }, // User's full name
        email: { type: String, required: true, unique: true }, // Unique email address
        password: { type: String, required: true }, // Hashed password
    },
    { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

// Export the User model for use in controllers
module.exports = mongoose.model('User', UserSchema);
