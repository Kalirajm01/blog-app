const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isValidPassword = await bcrypt.compare(req.body.password, user.password);
        if (!isValidPassword) return res.status(401).json({ message: 'Invalid password' });

        const token = jwt.sign({ userId: user._id }, 'secretkey', { expiresIn: '1h' });
        const username = user.email;
        res.json({ token, username });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { signup, login };
