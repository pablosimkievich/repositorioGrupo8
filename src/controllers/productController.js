const productController = {
    producto : (req, res) => {
        res.render('productDetail')   // productDetail.ejs
    },
    kitmusical : (req, res) => {
        res.render('productDetail')
    }
}

module.exports = productController;