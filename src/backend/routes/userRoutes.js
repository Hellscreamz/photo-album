const express = require('express');
const router = express.Router();
const userController = require('../controllers/User');

router.post('/create-user', userController.createUser);
router.post('/login-user', userController.loginUser);
router.get('/get-users', userController.getAllUsersWithPagination);

module.exports = router;
