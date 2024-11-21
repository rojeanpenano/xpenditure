// Import mongoose to define the schema
const mongoose = require('mongoose');

// Define the User schema
const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Export the User model
module.exports = mongoose.model('User', UserSchema);
