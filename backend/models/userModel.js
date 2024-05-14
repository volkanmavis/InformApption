const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, lowercase: true },
    password: { type: String, required: true }, // assuming you want passwords to be required
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    scores: {
        easy: [{ type: Number}],
        medium: [{ type: Number}],
        hard: [{ type: Number}]
    }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
