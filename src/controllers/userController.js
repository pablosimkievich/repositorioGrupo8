const path = require('path');
//const login= path.join(__dirname,'/views/users/login')
const userController = {
    login : (req, res) => {
       res.render(path.join(__dirname,'../views/users/login')) // login ejs
    },
    registro : (req, res) => {
        res.render(path.join(__dirname,'../views/users/register.ejs')) // registro.ejs
    },
    productCart : (req, res) => {
        res.render(path.join(__dirname,'../views/users/productCart.ejs')) //  productCart.ejs
    },
    quienesSomos : (req,res) => {
        res.render (path.join(__dirname,'../views/users/quienesSomos.ejs'))  //quienesSomos.ejs
    },

    preguntasFrecuentes : (req,res) => {
        res.render (path.join(__dirname,'../views/users/preguntasFrecuentes.ejs')) //preguntasFrecuentes.ejs
    },

    contacto : (req,res) => {
        res.render (path.join(__dirname,'../views/users/contacto.ejs')) //contacto.ejs
    },
};


module.exports = userController;
