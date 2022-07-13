const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const path=require('path')


router.get('/productos/', productController.productList);

router.get('/edad/:edadrecomendada', productController.getEdad);
router.get('/categorias/:categoria', productController.getCategory);


/********GET ONE PRODUCT***********/
router.get('/juguetes/:id', productController.productDetail);

/********CREATE A PRODUCT***********/
router.get('/crearProducto', productController.create );
router.post('/crearProducto',productController.saveNewProduct );
 
/********EDIT A PRODUCT***********/
router.get('/edit/:id', productController.edit );
router.post('/edit/:id',productController.saveEdit );

/********DELETE A PRODUCT***********/
router.delete('/:id' , productController.delete)


module.exports = router;