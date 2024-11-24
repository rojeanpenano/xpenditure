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
const sharedExpenseRoutes = require('./routes/sharedExpenseRoutes'); // Shared expense routes
const exportRoutes = require('./routes/exportRoutes'); // Export routes
const errorHandler = require('./middleware/errorHandler'); // Error handler
const logger = require('./utils/logger'); // Logger


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

// Connect to the database
connectDB().then(() => logger.info('Connected to MongoDB'));

// Log each request
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

// Set up routes for different modules
app.use('/api/users', userRoutes); // User-related endpoints
app.use('/api/transactions', transactionRoutes); // Transaction-related endpoints
app.use('/api/budgets', budgetRoutes); // Budget-related endpoints
app.use('/api/shared-expenses', sharedExpenseRoutes); // Shared expense endpoints
app.use('/api/export', exportRoutes); // Export endpoints

// Error handling middleware
app.use(errorHandler);

// Export the app for testing
module.exports = app;

// Start the server only if not in test mode
if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
}