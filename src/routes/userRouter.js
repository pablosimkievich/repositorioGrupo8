const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
//userController.login

router.get('/login', userController.login);
router.get('/registro', userController.registro);

router.post('/registro', userController.userCreate)  //  poste de registro de usuarios

router.get('/carrito', userController.productCart);
router.get('/quienesSomos', userController.quienesSomos);
router.get('/preguntasFrecuentes', userController.preguntasFrecuentes);
router.get('/contacto', userController.contacto);


module.exports = router;