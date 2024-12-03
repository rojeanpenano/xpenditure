// Import necessary modules
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
const errorHandler = require('./middleware/errorHandler');

// Initialize environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize the app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON payloads
app.use(cors()); // Enable CORS
app.use(helmet()); // Add security headers

// Routes
app.use('/api/users', userRoutes); // User-related endpoints
app.use('/api/transactions', transactionRoutes); // Transaction-related endpoints
app.use('/api/budgets', budgetRoutes); // Budget-related endpoints

// Error handling middleware
app.use(errorHandler);

// Set up the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
