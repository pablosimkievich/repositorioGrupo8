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
    }
};


module.exports = userController;
