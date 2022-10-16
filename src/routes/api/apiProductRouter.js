const express = require('express');
const router = express.Router();
const productController = require('../../controllers/api/productController');

router.get('/api/products', productController.getTheToys);
router.get('/api/products/:id', productController.getTheToyDetail);

module.exports = router;