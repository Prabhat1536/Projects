const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure this path to your User model is correct

// 1. REGISTER ROUTE
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save user
        user = new User({ name, email, password: hashedPassword });
        await user.save();

        // Create JWT Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(201).json({ token, user: { id: user._id, name, email } });
    } catch (err) {
        res.status(500).json({ message: 'Server error during registration' });
    }
});

// 2. LOGIN ROUTE
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid Credentials' });

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

        // Create JWT Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({ token, user: { id: user._id, name: user.name, email } });
    } catch (err) {
        res.status(500).json({ message: 'Server error during login' });
    }
});

module.exports = router;