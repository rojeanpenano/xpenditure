const mongoose = require('mongoose');

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        // Connect to MongoDB using URI from environment variables
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected...');
    } catch (error) {
        console.error('Database connection failed:', error.message);
        process.exit(1); // Exit the process on failure
    }
};

// Export the connection function for use in server.js
module.exports = connectDB;