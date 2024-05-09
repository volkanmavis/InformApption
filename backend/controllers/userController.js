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

        let token = jwt.sign({email: user.email, userId: user._id, role: user.role}, "fenerbahce")
        res.send({msg: "login successfully", token, role: user.role})

    } catch (error) {
        console.error(error);
        res.status(500).send({ msg: 'Internal server error' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find();
        res.status(200).json({ status: true, data: allUsers });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ status: false, error: "Internal server error" });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.deleteOne({_id: id});
        res.status(200).json({ status: true, message: "User deleted successfully" });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ status: false, error: "Internal server error" });
    }
};

const updateScore = async(req, res) => {
    const { userId, score } = req.body;

  try {
    // Find user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user's score
    user.scores.push(score);
    await user.save();

    return res.status(200).json({ message: 'Score updated successfully' });
  } catch (error) {
    console.error('Error updating score:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getUserInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const allInfo = await User.findById({_id: id});
        res.status(200).json({ status: true, data: allInfo });
    } catch (error) {
        console.error('Error fetching user info:', error);
        res.status(500).json({ status: false, error: "Internal server error" });
    }
};

module.exports = { register, login, getAllUsers, deleteUser, updateScore, getUserInfo };