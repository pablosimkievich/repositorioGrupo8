const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const path = require('path')
const multer = require('multer');
const { body } = require('express-validator');
const validateRegister = require('../middlewares/validateRegister');
const validateUserUpdate = require('../middlewares/validateUserUpdate');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folderPath = path.join(__dirname,'../../public/img/users');
        cb (null, folderPath);
    },
    filename: (req, file, cb) => {
        const newFileName = "img-user-" + Date.now() + path.extname(file.originalname);
        cb(null, newFileName)
    }  
});

const uploadFile = multer({storage}); 


router.get('/usuarios', userController.usersList) // todos los usuarios
router.get('/usuario/:id', authMiddleware, userController.userDetail) // detalle de usuario

router.get('/login', guestMiddleware, userController.login); // login
router.post('/login', userController.processLogin)

router.get('/registro', guestMiddleware, userController.registro);  // trae formulario registro
router.post('/registro', uploadFile.single('fotoPerfil'), validateRegister,  userController.userCreate)  //  post de registro de usuarios graba data

router.get('/edicion-usuario/:id', userController.userEdit) // trae formulario edición
router.put('/edicion-usuario',  uploadFile.single('fotoPerfil'), validateUserUpdate, userController.userUpdate) // graba edición usuario
router.delete('/delete/:id', userController.userDelete) // borra usuario

router.get('/carrito', userController.productCart);
router.get('/quienesSomos', userController.quienesSomos);
router.get('/preguntasFrecuentes', userController.preguntasFrecuentes);
router.get('/contacto', userController.contacto);

router.get('/logout', authMiddleware, userController.logout);

module.exports = router;