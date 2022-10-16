const express = require('express');
const router = express.Router();
const userController = require('../../controllers/api/userController');

router.get('/users', userController.getUsers);
router.get('/users/:id', userController.userDetail);
router.get('/orders', userController.getOrders)

module.exports = router;