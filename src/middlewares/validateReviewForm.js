const {body} = require('express-validator')

let validateReview = [
                    body('rating').notEmpty().withMessage('Debes ingresar un numero').bail()
                                   .isInt().withMessage('Debes ingresar un numero entero').bail(),
                                   
                    body('review_title').notEmpty().withMessage('Debes ingresar un titulo').bail()
                                        .isLength({min:3, mas:200}).withMessage('El titulo debe tener entre 3 y 200 caracteres').bail(),
                                        
                    body('review').notEmpty().withMessage('Debes ingresar un comentario').bail()
                    .isLength({min:3, mas:10000}).withMessage('El titulo debe tener entre 3 y 10000 caracteres').bail(),

                    ]

module.exports = validateReview