const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import the User model

const protect = async (req, res, next) => {
    let token;

    // Check for the Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract the token
            token = req.headers.authorization.split(' ')[1];

            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach the user to the request object
            req.user = await User.findById(decoded.id).select('-password');

            next(); // Proceed to the next middleware or route handler
        } catch (error) {
            console.error('Token verification failed:', error);
            res.status(401).json({ message: 'Not authorized. Token failed.' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized. No token provided.' });
    }
};

module.exports = { protect };
