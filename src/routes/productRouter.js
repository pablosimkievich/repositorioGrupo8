const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const path=require('path')


router.get('/productos', productController.productList);

router.get('/juguetes/:id', productController.productDetail);

router.get('/kit', productController.productDirect);

router.get('/crearProducto', productController.crearProducto );

router.post('/crearProducto',productController.guardar );
  


module.exports = router;