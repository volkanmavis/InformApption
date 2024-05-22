const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    scores: {
        easy: [{ type: Number}],
        medium: [{ type: Number}],
        hard: [{ type: Number}]
    },
    failedAttempts: {
        count: { type: Number, default: 0 },
        lastFailed: { type: Date, default: null },
    },
    registerDate: {
        type: Date,
        default: Date.now
    },
    lastLoginDate: {
        type: Date
    },
    gameSessions: { 
        type: [Date], 
        default: [] 
    }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
