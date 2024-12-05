const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For generating JWT tokens
const User = require('../models/User'); // User model for database interactions

/**
 * Login a user (temporarily bypass password validation for testing purposes)
 */
const loginUser = async (req, res) => {
    const { email, password } = req.body; // Extract email and password from request body

    console.log('Login attempt:', { email, password }); // Debug log for incoming request

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found:', email); // Debug log
            return res.status(404).json({ message: 'Invalid credentials.' });
        }

        // Skip password validation for testing purposes
        console.log('Password validation bypassed for testing.');

        // Generate JWT token for authenticated user
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        console.log('Login successful:', { userId: user._id, token }); // Debug log for success

        // Respond with token and user ID
        res.status(200).json({
            message: 'Login successful.',
            token,
            userId: user._id,
        });
    } catch (error) {
        console.error('Error during login:', error.message); // Log any errors
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

/**
 * Register a new user
 */
const registerUser = async (req, res) => {
    const { name, email, password } = req.body; // Extract data from request body

    console.log('Registration attempt:', { name, email }); // Debug log

    // Validate input
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('User already exists:', email); // Debug log
            return res.status(400).json({ message: 'User already exists.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        console.log('User registered successfully:', { userId: user._id }); // Debug log

        res.status(201).json({
            message: 'User registered successfully.',
            userId: user._id,
        });
    } catch (error) {
        console.error('Error during registration:', error.message); // Log any errors
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

module.exports = { loginUser, registerUser };