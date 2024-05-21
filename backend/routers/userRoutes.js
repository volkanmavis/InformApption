const express = require('express');
const router = express.Router();
const { register, login, getAllUsers, deleteUser, updateScore, getUserInfo, canPlay } = require('../controllers/userController');

router.post('/register', register);
router.post('/login', login);
router.get('/allusers', getAllUsers);
router.delete('/:id', deleteUser);
router.post('/updateScore', updateScore);
router.get('/score/:id', getUserInfo)
router.get('/canPlay/:id', canPlay)

module.exports = router;