const express = require('express');

const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/', mainController.index);
router.get('/index-categorias', mainController.indexCategorias)
router.get('/index-edad', mainController.indexEdad)



module.exports = router;