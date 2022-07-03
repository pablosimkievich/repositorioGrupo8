const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const path=require('path')


router.get('/', productController.productList);

router.get('/:id', productController.productDetail);

router.get('/crearProducto', productController.crearProducto );

//router.post('/crearProducto', );

module.exports = router;