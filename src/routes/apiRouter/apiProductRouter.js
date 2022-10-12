const express = require('express');
const router = express.Router();
const productController = require('../../controllers/api/productController');

router.get('/products', productController.getTheToys);
router.get('/products/:id', productController.getTheToyDetail);

module.exports = router;