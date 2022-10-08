const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const adminMiddleware = require('../middlewares/adminMiddleware');


router.get('/order-list', adminController.orderList);
router.get('/order-detail/:id', adminController.orderDetail);

router.get('/users', adminMiddleware, adminController.userList) // todos los usuarios
router.get('/user/:id',  adminController.userDetaille) // detalle de usuario
router.get('/product-orders/:id', adminController.productOrders)

router.get('/products', adminController.productList)

router.get('/review-product-list', adminController.reviewList)
router.get('/review-product-detail/:id', adminController.reviewDetail)


module.exports = router;