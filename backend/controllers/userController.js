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
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).send({ msg: 'Email and password are required' });
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).send({ msg: 'User not found' });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).send({ msg: 'Invalid password' });
      }
  
      user.lastLoginDate = new Date();
      await user.save();
  
      const token = jwt.sign({ email: user.email, userId: user._id, role: user.role }, "fenerbahce");
      res.send({ msg: "login successfully", token, role: user.role });
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

const updateScore = async (req, res) => {
    try {
      const { userId, score, choice } = req.body;
      const user = await User.findById(userId);
  
      if (!user.scores) {
        user.scores = { easy: [], medium: [], hard: [] };
      }
  
      switch (choice) {
        case 'easy':
          user.scores.easy.push(score);
          break;
        case 'medium':
          user.scores.medium.push(score);
          break;
        case 'hard':
          user.scores.hard.push(score);
          break;
        default:
          return res.status(400).json({ error: 'Invalid choice' });
      }
      user.gameSessions.push(new Date());
      user.gameSessions = user.gameSessions.filter(session => session > new Date(Date.now() - 24 * 60 * 60 * 1000));
  
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

const canPlay = async (req, res) => {
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
    
        const now = new Date();
        const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        const recentSessions = user.gameSessions.filter(session => session > last24Hours);
    
        if (recentSessions.length >= 3) {
          return res.status(403).json({ canPlay: false, message: 'You have reached the play limit for today.' });
        }
        res.json({ canPlay: true });
      } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
      }
    ;
}


module.exports = { register, login, getAllUsers, deleteUser, updateScore, getUserInfo, canPlay };

