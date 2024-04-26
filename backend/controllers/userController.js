const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/auth')
const register = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        if (!email || !password || !userName) {
            return res.status(400).json({ error: 'Username, email, and password are required' });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ userName, email, password: hashedPassword });
        res.status(200).json({ message: 'Registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({ msg: 'Email and password are required' });
        }
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ msg: 'User not found' });
        }
        let isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send({ msg: 'Invalid password' });
        }

        let token = jwt.sign({email: user.email, userId: user._id}, "fenerbahce")
        res.send({msg: "login successfully", token})

    } catch (error) {
        console.error(error);
        res.status(500).send({ msg: 'Internal server error' });
    }
};


module.exports = { register, login };