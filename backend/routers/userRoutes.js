const express = require('express');
const router = express.Router();
const { register, login, getAllUsers, deleteUser } = require('../controllers/userController');

router.post('/register', register);
router.post('/login', login);
router.get('/allusers', getAllUsers);
router.delete('/:id', deleteUser)

module.exports = router;