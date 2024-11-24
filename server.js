// Import necessary modules
const express = require('express'); // Web framework
const dotenv = require('dotenv'); // Environment variable management
const cors = require('cors'); // Cross-Origin Resource Sharing
const helmet = require('helmet'); // Security headers
const rateLimit = require('express-rate-limit'); // Rate limiting
const connectDB = require('./config/db'); // MongoDB connection function
const userRoutes = require('./routes/userRoutes'); // User routes
const transactionRoutes = require('./routes/transactionRoutes'); // Transaction routes
const budgetRoutes = require('./routes/budgetRoutes'); // Budget routes

// Load environment variables from .env file
dotenv.config();

// Initialize the Express application
const app = express();

// Middleware setup
app.use(express.json()); // Parse JSON payloads
app.use(cors()); // Enable CORS for all routes
app.use(helmet()); // Add security headers

// Apply rate limiting to all routes to prevent abuse
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: 'Too many requests, please try again later.',
});
app.use(limiter);

// Connect to MongoDB
connectDB();

// Define routes for different modules
app.use('/api/users', userRoutes); // User-related endpoints
app.use('/api/transactions', transactionRoutes); // Transaction-related endpoints
app.use('/api/budgets', budgetRoutes); // Budget-related endpoints

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace for debugging
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

// Start the server on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));