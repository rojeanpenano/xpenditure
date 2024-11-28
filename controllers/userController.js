const bcrypt = require('bcrypt'); // For hashing passwords
const jwt = require('jsonwebtoken'); // For generating and verifying tokens
const User = require('../models/User'); // User model for database operations
const crypto = require('crypto'); // For generating secure tokens
const nodemailer = require('nodemailer'); // For sending email notifications

// Register a new user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login a user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({
            message: 'Login successful',
            token,
            userId: user._id,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve user balances
const getBalances = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            balances: {
                cash: user.cash,
                card: user.card,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update user balances
const updateBalances = async (req, res) => {
    try {
        const userId = req.user.id;
        const { cash, card } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update balances
        if (cash !== undefined) user.cash = cash;
        if (card !== undefined) user.card = card;

        await user.save();

        res.status(200).json({
            message: 'Balances updated successfully',
            balances: {
                cash: user.cash,
                card: user.card,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getBalances,
    updateBalances,
};
