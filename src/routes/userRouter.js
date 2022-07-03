const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
//userController.login

router.get('/login', userController.login);

router.get('/registro', userController.registro);

router.get('/carrito', userController.productCart);

module.exports = router;