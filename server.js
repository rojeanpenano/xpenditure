// Import necessary modules
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db'); // MongoDB connection function
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

// Load environment variables from the .env file
dotenv.config();

// Initialize the Express app
const app = express();

// Middleware setup
app.use(express.json()); // Parse JSON payloads
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)

// Connect to MongoDB
connectDB();

// Define routes for users and transactions
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
