const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Register a user
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({ name, email, password });
        const { name: userName, email: userEmail } = user; // Exclude sensitive fields
        res.status(201).json({ message: 'User registered successfully', user: { name: userName, email: userEmail } });
    } catch (err) {
        console.error(err.message);
        res.status(400).json({ error: 'An error occurred. Please try again later.' });
    }
};

// Login a user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRE || '1h',
                audience: 'PiazzaAPI',
                issuer: 'PiazzaProject',
            }
        );
        res.status(200).json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(400).json({ error: 'An error occurred. Please try again later.' });
    }
};
