const db = require('../database/models/index');
// const User = require('../database/models/User');
// const fs = require('fs');
const { markAsUntransferable } = require('worker_threads');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const op = db.Sequelize.Op;

/* const userList = async (req, res) => {
    try {
        const allUsers = await db.User.findAll()
        res.render('users/userList', {allUsers})
    } catch (error) {
        console.log(error);
    }
} */

const userDetaille = async (req, res) => {
    try {
        const id = req.params.id
        const userDetail = await db.User.findByPk(id, {
            include: [
                {
                    association: 'order_detail'
                }
            ]
        });
        
        const orders = await db.Order.findAll({
            where: {
                user_id: id
            }
        })

        if (userDetail) {
            res.render('users/userDetail', {userDetail, orders});
        } else {
            res.send(`No existe el usuario Nro. : ${id}`)
        }
        
    } catch (error) {
        console.log(error);
    }
}

const registro = (req, res) => {
    res.render('users/register')
}

const userCreate = async (req, res) => {
    const resultValidation = validationResult(req);
    const userInDb = await db.User.findOne({
        where: {
            user_mail: req.body.email
        }
    });
    if (resultValidation.errors.length > 0) {
        console.log(resultValidation)
        res.render('users/register', {
            errors: resultValidation.mapped(),
            oldData: req.body
        });
    } else if (userInDb) {
        return res.render('users/register', {
            errors: {
                email: {
                    msg: 'El email ya se encuentra registrado'
                }               
            }, oldData: req.body
        });
    } else {                 
        let newUser = {
            user_type_id: 1,
            user_first_name: req.body.nombre,
            user_last_name: req.body.apellido,
            user_mail: req.body.email,
            user_cel: req.body.telefono,
            user_address: req.body.domicilio,
            dni: req.body.dni,
            password: bcrypt.hashSync(req.body.password, 10),
            user_img: req.file ? req.file.filename : ""
        }
        try {
            await db.User.create(newUser);
            res.redirect('/login');
        } catch (error) {
            console.log(error);
        }
    }
}

const userEdit = async (req, res) => {
    const id = req.params.id
    let userEdit = await db.User.findByPk(id)
    res.render('users/userEdit', {userEdit}) 
}

const userUpdate = async (req, res) => {
    const resultValidation = validationResult(req);
    const userEdit = await db.User.findByPk(req.body.id);
    if (resultValidation.errors.length > 0) {
        console.log(resultValidation)
        res.render('users/userEdit', {
            
            errors: resultValidation.mapped(),
            oldData: req.body,
            userEdit: userEdit,
        }); 
    } else {
        let userUpdated = {
            user_id_type: 1,
            user_first_name: req.body.nombre,
            user_last_name: req.body.apellido,
            user_mail: req.body.email,
            user_cel: req.body.telefono,
            user_address: req.body.domicilio,
            password: userEdit.password,
            dni: req.body.dni,
            user_img: req.file ? req.file.filename : userEdit.user_img
        }

        try {
            await db.User.update(userUpdated,
                {
                    where: {
                        id: userEdit.id
                    }
                }
            )
        req.file ? req.body.fotoPerfil = req.file.filename: req.body.fotoPerfil = userEdit.user_img
        req.session.userLogged = req.body
        req.session.userLogged.user_img = req.body.fotoPerfil; 
        req.session.userLogged.user_first_name = req.body.nombre
        res.locals.userLogged = req.session.userLogged
        res.locals.userLogged.user_img = req.session.userLogged.user_img;
        res.locals.userLogged.user_first_name = req.session.userLogged.user_first_name;
        res.redirect(`/usuario/${userEdit.id}`)
        } catch (error) {
            console.log(error);
        }
    }
}

const userDelete = async (req, res) => {
   try {
        await db.User.destroy({
            where: {
                id: req.params.id
            }
        });

        res.clearCookie('userEmail');
        req.session.destroy();

        res.redirect('/')
   } catch (error) {
        console.log (error);
   }
}

const login = (req, res) => {
    res.render('users/login')
}

const processLogin = async (req, res) => {
    const resultValidation = validationResult(req);
    errors = resultValidation.mapped();
    oldData = req.body;
    
    let userToLogin = await db.User.findOne({
        where: {
            user_mail: req.body.email
        }
    });
    // console.log(userToLogin.password)
    // console.log(req.body.password)
    if(userToLogin){
        const password = req.body.password;
        let passwordMatch = bcrypt.compareSync(password, userToLogin.password);
        // console.log(passwordMatch);
        if(passwordMatch){
            delete userToLogin.password 
            req.session.userLogged = userToLogin

            if (req.body.remember) {
                res.cookie('userEmail', req.body.email, {maxAge: 1000 * 120});   
            }

            return res.redirect('/');

        } else {
            res.render('users/login', {
                errors: {
                    password: {
                        msg: 'Las credenciales son inválidas'
                    }               
                }, oldData: req.body
            })
        }
    }else{
            res.render('users/login' , {
                errors: {
                    email: {
                        msg: 'El email no se encuentra registrado'
                    }               
                }, oldData: req.body
            })        
    }
}

const logout = (req, res) => {
    res.clearCookie('userEmail');
    req.session.destroy();
    return res.redirect('/');
}

const contacto = (req, res) => {
    res.render('users/contacto');
}

const preguntasFrecuentes = (req, res) => {
    res.render('users/preguntasFrecuentes')
}

const quienesSomos = (req, res) => {
    res.render('users/quienesSomos');
}

const productCart = (req, res) => {
    res.render('users/productCart');
};

const misCompras = async (req, res) => {

    try {
        const id = req.params.id;
        const misOrdenesCompra = await db.Order.findAll({
            where: {
                user_id: id
            },
            include: [
                {
                    association: 'users'
                },
                {
                    association: 'payment_method'
                },
                {
                    association: 'order_detail'
                }
            ]
        })

        const misDetallesCompra = await db.OrderDetail.findAll({
            where: {
                fk_user_id: id
            },
            include: [
                {
                    association: 'products'
                },
                {
                    association: 'reviews'
                }
            ]
        }) 

        if (misOrdenesCompra.length >= 1) {
            
            // res.send('Tienes compras realizadas')
            res.render('users/misCompras', {misOrdenesCompra, misDetallesCompra})

        } else  {
            res.send(`No has realizado compras todavía, ususario Nro. : ${id} `)
        }
    } catch(error) {

    }
    
};

const reviewForm = async (req, res) => {

    try {
        const id = req.params.id;
        const myOrderDetail = await db.OrderDetail.findByPk(id,{
            include: [
                {
                    association: 'products'
                },
                {
                    association: 'users'
                }
            ]
        })

        if (myOrderDetail) {
            res.render('users/reviewForm', {myOrderDetail});
        } else {
            res.send(`No existe el detalle de compra Nro. :${id}`)
        }

        

    } catch(error) {
        console.log(error)
    }
};

const reviewCreate = async (req, res) => {

    try {

        let newReview = {
            order_detail_fk_id: req.body.order_detail_fk_id,
            product_fk_id: req.body.product_fk_id,
            review_title: req.body.review_title,
            review: req.body.review,
            rating: req.body.rating,
            userr_fk_id: req.body.userr_fk_id
        } 
        console.log(newReview)
        await db.Review.create(newReview);

        res.redirect('/')
    } catch(error) {
        comsole.log(error);
    }
}

module.exports = {
    userDetaille, 
    registro,
    userCreate,
    userEdit,
    userUpdate,
    userDelete,
    login,
    processLogin,
    logout,
    contacto,
    preguntasFrecuentes,
    quienesSomos,
    productCart,
    misCompras,
    reviewForm,
    reviewCreate
}

