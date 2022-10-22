const express = require('express');
const router = express.Router();
const userController = require('../../controllers/api/userController');

router.get('/api/users', userController.getUsers);
router.get('/api/users/:id', userController.userDetail);
router.get('/api/orders', userController.getOrders)

module.exports = router;