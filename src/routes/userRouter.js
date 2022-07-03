const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', (req, res) => {
    res.send('Bienvenidos a usuarios')
})

router.get('/login', userController.login);

router.get('/registro', userController.registro);

router.get('/carrito-de-compras', userController.productCart);

module.exports = router;