const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { jwtSecret, jwtExpire } = require('../config/config');

// Register a user
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({ name, email, password });
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Login a user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: jwtExpire });
        res.status(200).json({ token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
