const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    scores: {
        easy: [{ type: Number}],
        medium: [{ type: Number}],
        hard: [{ type: Number}]
    },
    gameSessions: {
        type: [Date],
        default: []
    },
    registerDate: {
        type: Date,
        default: Date.now
    },
    lastLoginDate: {
        type: Date
    }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
