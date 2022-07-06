

const path = require('path');
const fs = require('fs');
const dataPath = path.join(__dirname,'../database/jugetes.json');
const data =JSON.parse(fs.readFileSync(dataPath,"UTF-8"));


module.exports = {
    productList: (req,res)=> {

        res.render('product/productos', {data}) // products.ejs
    },
    productDetail:  (req,res)=> {
        let id = req.params.id;
        console.log(id)
       
      
        let juguete = data.find( e => e.SKU ==parseInt(id));
        console.log(juguete)
        console.log(data)
        if(juguete){
            res.render('product/productDetail', {juguete})  // productDetail.ejs
        }else{
                res.send("No existe el juguete")
        }
       
        
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

