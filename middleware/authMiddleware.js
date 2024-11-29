const jwt = require('jsonwebtoken'); // Import JWT for token verification
const User = require('../models/User'); // User model for user data retrieval

/**
 * Middleware to protect routes
 */
const protect = async (req, res, next) => {
    let token;

    // Check for the token in the Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]; // Extract the token

            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach the authenticated user's data to the request object
            req.user = await User.findById(decoded.id).select('-password');
            next(); // Proceed to the next middleware or route handler
        } catch (error) {
            console.error('Authorization error:', error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token provided' });
    }
};

module.exports = { protect };
