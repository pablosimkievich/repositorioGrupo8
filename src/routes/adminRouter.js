const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const onlyAdminMiddleware = require('../middlewares/onlyAdminMiddleware');

router.get('/order-list', onlyAdminMiddleware, adminController.orderList);
router.get('/order-detail/:id', onlyAdminMiddleware, adminController.orderDetail);

router.get('/users', onlyAdminMiddleware, adminController.userList) // todos los usuarios
router.get('/user/:id', onlyAdminMiddleware,  adminController.userDetaille) // detalle de usuario
router.get('/product-orders/:id', onlyAdminMiddleware, adminController.productOrders)


router.get('/review-product-list', onlyAdminMiddleware, adminController.reviewList)
router.get('/review-product-detail/:id', onlyAdminMiddleware,  adminController.reviewDetail)

router.get('/control-panel', onlyAdminMiddleware, adminController.controlPanel)

router.get('/admin-logout', adminController.adminLogout);

module.exports = router;