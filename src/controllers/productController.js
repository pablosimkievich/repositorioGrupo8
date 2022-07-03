const path = require('path')

const productController = {
    productList: (req,res)=> {
        res.render(path.join(__dirname,'../views/product/products') ) // products.ejs
    },
    productDetail:  (req,res)=> {
        res.render(path.join(__dirname,'../views/product/productDetail') )  // productDetail.ejs
    },
    
    crearProducto: (req, res)=> {
        res.render(path.join(__dirname,'../views/product/crearProducto')) //crearProducto ejs
    }
}

module.exports = productController;