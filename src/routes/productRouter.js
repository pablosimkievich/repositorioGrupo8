const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


router.get('/', (req, res) => {
    res.send('Hola');
})

router.get('/kit-musical', productController.kitmusical);


module.exports = router;