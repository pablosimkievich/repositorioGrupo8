const {body} = require('express-validator')

const validateUpdateForm = [
    body('name').notEmpty().withMessage("Este campo no puede estar vacio").bail()
                .isLength({min:5, max:100}).withMessage('El nombre del producto debe tener entre 5 y 100 caracteres').bail(),

    body('price').notEmpty().withMessage("Este campo no puede estar vacio").bail(),

    body('discount').isFloat({min:0,max:100}).withMessage("Debes ingresar un numero entre el 0 y 100").bail(),

    body('materials').notEmpty().withMessage('Este campo no puede estar vacio').bail()
    .isLength({min:3, max:200}).withMessage('Los materiales deben tener entre 3 y 200 caracteres').bail(),
    
    body('category_id').notEmpty().withMessage("Este campo no puede estar vacio").bail(),

    body('age_id').notEmpty().withMessage("Este campo no puede estar vacio").bail(),

    body('principal_img').custom((value, { req } ) => {
        let stringfile = req.body.principal_img;
      

        if (stringfile) {
               if (!stringfile.includes('.jpg' ) && !stringfile.includes('.png' )
               && !stringfile.includes('.jpeg') && !stringfile.includes('.gif')) {
                throw new Error("Las extensiones de archivo permitidas son '.jpg', '.jpeg  '.png' y '.gif' " )
            } 
            
        } 
        return true
        }).withMessage("Las extensiones de archivo permitidas son '.jpg', '.jpeg' , '.png' y '.gif' "),
        
        
        body('secondary_img').custom((value, { req } ) => {
            let stringfile = req.body.secondary_img;
            console.log(stringfile)
    
            if (stringfile) {

                let arrayCheck = Array.isArray(stringfile);

                if (arrayCheck == true) {
                    stringfile.map( elem => {
                        if (!elem.includes('.jpg' ) && !elem.includes('.png' )
                        && !elem.includes('.jpeg') && !elem.includes('.gif')) {
                        throw new Error("Las extensiones de archivo permitidas son '.jpg', '.jpeg', '.png' y '.gif' ")
                    }
                    })

                } else {
                    if (!stringfile.includes('.jpg' ) && !stringfile.includes('.png' )
                    && !stringfile.includes('.jpeg') && !stringfile.includes('.gif')) {
                    throw new Error("Las extensiones de archivo permitidas son '.jpg', '.jpeg', '.png' y '.gif' ")
                }

  
                } 
                
            } 
            return true
            }).withMessage("Las extensiones de archivo permitidas son '.jpg', '.jpeg', '.png' y '.gif' "),
        

            body('width').notEmpty().withMessage('Debes ingresar un numero').bail()
            .isDecimal().withMessage('Debes ingresar un numero decimal').bail(),
            
            body('height').notEmpty().withMessage('Debes ingresar un numero').bail()
            .isDecimal().withMessage('Debes ingresar un numero decimal').bail(),
            
            body('depth').notEmpty().withMessage('Debes ingresar un numero').bail()
            .isDecimal().withMessage('Debes ingresar un numero decimal').bail(), 

            body('weight').notEmpty().withMessage('Debes ingresar un numero').bail()
            .isDecimal().withMessage('Debes ingresar un numero decimal').bail(),

            body('stock').notEmpty().withMessage('Debes ingresar un numero').bail()
            .isDecimal().withMessage('Debes ingresar un numero decimal').bail(),

            body('description').notEmpty().withMessage('Debes ingresar un descripcion').bail()
            .isLength({min:20, max:10000}).withMessage('La descripcion debe tener entre 20 y 10000 caracteres').bail(),
]


module.exports = validateUpdateForm;