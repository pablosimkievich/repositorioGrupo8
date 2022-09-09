const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const mainController2 = require('../controllers/mainController2');

router.get('/', mainController2.index);
router.get('/index-categorias', mainController.indexCategorias)
router.get('/index-edad', mainController.indexEdad)



module.exports = router;