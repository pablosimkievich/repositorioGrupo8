const express = require('express');
const router = express.Router();
const userController = require('../../controllers/api/userController');

router.get('/users', userController.getUsers);
router.get('/users/:id', userController.userDetail)

module.exports = router