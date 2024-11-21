// Import the mongoose library to handle MongoDB connections
const mongoose = require('mongoose');

// Function to connect to the MongoDB database
const connectDB = async () => {
    try {
        // Use mongoose to connect to MongoDB using the URI from environment variables
        await mongoose.connect(process.env.MONGO_URI);

        // Log a success message if the connection is successful
        console.log('MongoDB connected...');
    } catch (error) {
        // Log an error message and exit the process if the connection fails
        console.error('Database connection error:', error.message);
        process.exit(1); // Exit the process with a failure status code
    }
};

// Export the connectDB function for use in other parts of the application
module.exports = connectDB;
