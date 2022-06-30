const userController = {
    login : (req, res) => {
        res.render('login');  // login ejs
    },
    registro : (req, res) => {
        res.render('register');  // registro.ejs
    },
    productCart : (req, res) => {
        res.render('productCart')  //  productCart.ejs
    }
};


module.exports = userController;
