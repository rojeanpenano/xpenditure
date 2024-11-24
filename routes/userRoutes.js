const express = require('express'); // Import Express to create the router
const { body } = require('express-validator'); // Import for validation
const {
    registerUser,
    loginUser,
    requestPasswordReset,
    resetPassword,
} = require('../controllers/userController'); // Import user controller functions

const router = express.Router();

// Route: Register a new user
// Validation: Ensure all required fields are provided and email is valid
router.post(
    '/register',
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Invalid email address'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    ],
    registerUser
);

// Route: Login a user
// Validation: Ensure email and password are provided
router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Invalid email address'),
        body('password').notEmpty().withMessage('Password is required'),
    ],
    loginUser
);

// Route: Request a password reset
// Validation: Ensure email is provided and valid
router.post(
    '/forgot-password',
    [
        body('email').isEmail().withMessage('Invalid email address'),
    ],
    requestPasswordReset
);

// Route: Reset a user's password
// Validation: Ensure a valid password is provided
router.post(
    '/reset-password/:token',
    [
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    ],
    resetPassword
);

module.exports = router; // Export the router
