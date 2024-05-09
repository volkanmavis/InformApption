const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, lowercase: true},
    password: String,
    role: {type: String, enum: ['user', 'admin'], default: 'user'},
    scores: [{type: Number}]
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;