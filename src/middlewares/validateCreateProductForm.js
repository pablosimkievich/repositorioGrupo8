const {body} = require('express-validator')

const validateCreateForm = [
    body('name').notEmpty().withMessage("Este campo no puede estar vacio").bail()
                .isLength({min:3, masx:100}).withMessage('El nombre del producto debe tener entre 3 y 100 caracteres').bail(),

    body('price').notEmpty().withMessage("Este campo no puede estar vacio").bail(),

    body('discount').isFloat({min:0,max:100}).withMessage("Debes ingresar un numero entre el 0 y 100").bail(),

    body('materials').notEmpty().withMessage('Este campo no puede estar vacio').bail()
    .isLength({min:3, max:200}).withMessage('Los materiales deben tener entre 3 y 200 caracteres').bail(),
    
    body('category_id').notEmpty().withMessage("Este campo no puede estar vacio").bail(),

    body('age_id').notEmpty().withMessage("Este campo no puede estar vacio").bail(),

    body('principal_img').custom((value, { req } ) => {
        let stringfile = req.body.principal_img;
      

        if (stringfile) {
               if (!stringfile.includes('.jpg' ) && !stringfile.includes('.png' )) {
                throw new Error("Las extensiones de archivo permitidas son '.jpg' y '.png'" )
            } 
            
        } 
        return true
        }).withMessage("Las extensiones de archivo permitidas son '.jpg' y '.png'"),
        
        
        body('secondary_img').custom((value, { req } ) => {
            let stringfile = req.body.principal_img;
           
    
            if (stringfile) {
                   if (!stringfile.includes('.jpg' ) && !stringfile.includes('.png' )) {
                    throw new Error("Las extensiones de archivo permitidas son '.jpg' y '.png'")
                } 
                
            } 
            return true
            }).withMessage("Las extensiones de archivo permitidas son '.jpg' y '.png'")
        .isLength({min:0,max:4}).withMessage('Solo se pueden subir hasta 4 imagenes'),

            body('width').notEmpty().withMessage('Debes ingresar un numero').bail()
            .isInt().withMessage('Debes ingresar un numero entero').bail(),
            
            body('height').notEmpty().withMessage('Debes ingresar un numero').bail()
            .isInt().withMessage('Debes ingresar un numero entero').bail(),
            
            body('depth').notEmpty().withMessage('Debes ingresar un numero').bail()
            .isInt().withMessage('Debes ingresar un numero entero').bail(), 

            body('weight').notEmpty().withMessage('Debes ingresar un numero').bail()
            .isInt().withMessage('Debes ingresar un numero entero').bail(),

            body('stock').notEmpty().withMessage('Debes ingresar un numero').bail()
            .isInt().withMessage('Debes ingresar un numero entero').bail(),

            body('description').notEmpty().withMessage('Debes ingresar un descripcion').bail()
            .isLength({min:3, max:10000}).withMessage('La descripcion debe tener entre 3 y 10000 caracteres').bail(),



                

]


module.exports = validateCreateForm