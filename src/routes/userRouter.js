const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');



router.get('/usuarios', userController.usersList) // todos los usuarios
router.get('/usuario/:id', userController.userDetail) // detalle de usuario

router.get('/login', userController.login); // login

router.get('/registro', userController.registro);  // trae formulario registro
router.post('/registro', userController.userCreate)  //  post de registro de usuarios graba data

router.get('/edicion-usuario/:id', userController.userEdit) // trae formulario edición
router.put('/edicion-usuario', userController.userEditSave) // graba edición usuario
router.delete('/delete/:id', userController.userDelete) // borra usuario

router.get('/carrito', userController.productCart);
router.get('/quienesSomos', userController.quienesSomos);
router.get('/preguntasFrecuentes', userController.preguntasFrecuentes);
router.get('/contacto', userController.contacto);


module.exports = router;