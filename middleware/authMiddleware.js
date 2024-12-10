const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

/**
 * Middleware to protect routes by verifying JWT token and attaching user to the request object
 */
const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]; // Extract token from header

            // Verify the token and decode its payload
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach the user to the request object
            req.user = await User.findById(decoded.id).select('-password');

            next(); // Proceed to the next middleware or route handler
        } catch (error) {
            console.error('Token verification failed:', error.message);
            res.status(401);
            throw new Error('Not authorized, invalid token');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token provided');
    }
});

module.exports = protect;
