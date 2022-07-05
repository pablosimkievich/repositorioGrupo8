

const path = require('path');
const fs = require('fs');
const dataPath = path.join(__dirname,'../database/jugetes.json');
const data =JSON.parse(fs.readFileSync(dataPath,"UTF-8"));


module.exports = {
    productList: (req,res)=> {

        res.render('product/productos', {data}) // products.ejs
    },
    productDetail:  (req,res)=> {
        let juguetes
        res.render('productDetail', {data})  // productDetail.ejs
    },
    
    crearProducto: (req, res)=> {
        res.render('product/crearProducto');           // vemos el form en crearProducto.ejs
    
    },
    guardar: (req, res)=> {
        let newProduct = req.body;
        data.push(newProduct);
        fs.writeFileSync(dataPath, JSON.stringify(data,null,' '))

        console.log(newProduct)



        res.redirect('/')

                

        },
}

