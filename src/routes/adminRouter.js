const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/order-list', adminController.orderList);
router.get('/order-detail', adminController.orderDetail);


module.exports = router;