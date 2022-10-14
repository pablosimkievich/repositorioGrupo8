const { body } = require('express-validator');
const path = require('path');
const { nextTick } = require('process');

const validateLogin = [
    body('email')
        .notEmpty().withMessage('Debes ingresar tu email').bail()
        .isEmail().withMessage('Debes ingresar un email válido'),

    body('password')
        .notEmpty().withMessage('Debes ingresar una contraseña').bail()
        .isLength( { min: 8 } ).withMessage('La contraseña debe tener un mínimo de 8 caracteres').bail(),

]


module.exports = validateLogin;