const crypto = require('crypto'); // For generating secure tokens
const bcrypt = require('bcrypt'); // For hashing passwords
const jwt = require('jsonwebtoken'); // For creating JSON Web Tokens
const nodemailer = require('nodemailer'); // For sending emails
const User = require('../models/User'); // Import the User model

// Register a new user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password for security
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the new user
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

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verify the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({ message: 'Login successful', token, userId: user._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Request password reset
const requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if the email exists in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate a reset token and hash it
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // Token valid for 10 minutes

        await user.save();

        // Configure email transporter
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER, // Your email
                pass: process.env.EMAIL_PASS, // Your email password or app-specific password
            },
        });

        // Send the reset token to the user
        const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;
        const mailOptions = {
            to: email,
            subject: 'Password Reset Request',
            html: `<p>You requested a password reset. Click <a href="${resetUrl}">here</a> to reset your password. This link is valid for 10 minutes.</p>`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Password reset link sent to your email' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Reset password
const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        // Hash the token and find the corresponding user
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }, // Ensure token is still valid
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Update the user's password and clear the reset token fields
        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser, loginUser, requestPasswordReset, resetPassword };
