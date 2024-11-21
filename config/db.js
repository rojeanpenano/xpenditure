// Import mongoose to handle MongoDB connections
const mongoose = require('mongoose');

// Function to establish a connection to the MongoDB database
const connectDB = async () => {
    try {
        // Connect to MongoDB using the URI from environment variables
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected...');
    } catch (error) {
        console.error('Database connection error:', error.message);
        process.exit(1); // Exit the process if the connection fails
    }
};

// Export the connection function for use in other files
module.exports = connectDB;
