const bcrypt = require('bcrypt'); // For hashing passwords
const jwt = require('jsonwebtoken'); // For generating and verifying tokens
const User = require('../models/User'); // User model for database operations
const crypto = require('crypto'); // For generating secure tokens
const nodemailer = require('nodemailer'); // For sending email notifications

/**
 * Register a new user
 */
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate request body
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password for secure storage
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save a new user
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        // Respond with a success message
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error.message);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

/**
 * Login a user
 */
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    console.log('Login attempt:', { email, password }); // Debug log for incoming data

    // Validate request body
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found.' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Password mismatch');
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Generate a token for the authenticated user
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Login successful:', { userId: user._id });

        // Respond with the token and userId
        res.status(200).json({ token, userId: user._id });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};

/**
 * Retrieve user balances
 */
const getBalances = async (req, res) => {
    try {
        const userId = req.user.id;

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Respond with the user's balances
        res.status(200).json({
            balances: {
                cash: user.cash,
                card: user.card,
            },
        });
    } catch (error) {
        console.error('Get balances error:', error.message);
        res.status(500).json({ message: error.message });
    }
};

/**
 * Update user balances
 */
const updateBalances = async (req, res) => {
    try {
        const userId = req.user.id;
        const { cash, card } = req.body;

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update balances if provided
        if (cash !== undefined) user.cash = cash;
        if (card !== undefined) user.card = card;

        await user.save();

        // Respond with the updated balances
        res.status(200).json({
            message: 'Balances updated successfully',
            balances: {
                cash: user.cash,
                card: user.card,
            },
        });
    } catch (error) {
        console.error('Update balances error:', error.message);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getBalances,
    updateBalances,
};
