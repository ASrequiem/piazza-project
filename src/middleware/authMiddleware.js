const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');

exports.protect = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = { id: decoded.id };
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token invalid' });
    }
};
