const express = require('express');
const router = express.Router();
const productController = require('../../controllers/api/productController');

router.get('/api/products', productController.getTheToys);
router.get('/api/products/:id', productController.getTheToyDetail);
router.post('/api/shopping-cart', productController.getUserToysCart)

router.get('/api/fetching', productController.fetching)
router.post('/api/fetching', productController.fetching2)

module.exports = router;