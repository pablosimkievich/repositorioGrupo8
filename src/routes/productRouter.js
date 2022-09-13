const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const productController2 = require('../controllers/productController2');
const path=require('path')


router.get('/productos/', productController2.productList);

/********CONTROL PANEL PARA EDITAR/BORRAR PRODUCTOS***********/
router.get('/productPanel', productController2.productPanel);

/********PRODUCT LIST por categoria y edad***********/
router.get('/edad/:edadrecomendada', productController.getEdad);
router.get('/categorias/:categoria', productController.getCategory);


/********GET PRODUCT DETAIL***********/
router.get('/juguetes/:id', productController2.productDetail);

/********CREATE A PRODUCT***********/
router.get('/crearProducto', productController2.create );
router.post('/crearProducto', productController2.saveNewProduct );
 
/********EDIT A PRODUCT***********/
router.get('/edit/:id', productController2.edit );
router.put('/edit/:id', productController.saveEdit );

/********DELETE A PRODUCT***********/
router.delete('/:id' , productController2.deleteProduct)

/********SEARCH A PRODUCT***********/
router.get('/search', productController.search);


module.exports = router;