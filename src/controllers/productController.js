

const path = require('path');
const fs = require('fs');
const e = require('express');
const { Console } = require('console');
const dataPath = path.join(__dirname, '../database/jugetes.json');
const data = JSON.parse(fs.readFileSync(dataPath, "UTF-8"));


module.exports = {
    productList: (req, res) => {
        
        res.render('product/productos', { data }) // products.ejs
    },
    productDetail: (req, res) => {
        let id = req.params.id;
        console.log(id)


        let juguete = data.find(e => e.SKU == parseInt(id));
        console.log(juguete)
        console.log(data)
        if (juguete) {
            res.render('product/productDetail', { juguete })  // productDetail.ejs
        } else {
            res.send("No existe el juguete")
        }


    },
    productDirect: (req, res) => {
        res.render('/product/productDetail')   // link de home ( / ) a productDetail.ejs ddirecto 
    },
    create: (req, res) => {
        res.render('product/crearProducto');           // vemos el form en crearProducto.ejs

    },
   
  
    saveNewProduct: (req, res) => {
        let id = data[data.length-1].id +1;
        let newProduct = req.body;
    

        data.push(newProduct);
        fs.writeFileSync(dataPath, JSON.stringify(data, null, ' '))

        res.redirect('/')
    },

    getCategory: (req, res) => {
        let categoria = req.params.categoria;
        let juguetesCategoria = data.filter(e => ((e.categoria).replace(' ', '').toLowerCase() == categoria))
       

       res.render('product/categoria',{juguetesCategoria})
    },

    getEdad: (req,res)=>{
        
        let edad = req.params.edadrecomendada;

        let juguetesXedad = data.filter(e =>(e.edadRecomendada.includes(edad))? e : '')

        res.render('product/edades',{juguetesXedad})                                 
    },

    edit: (req,res)=>{
       let id =parseInt(req.params.id)
       let jugueteEdit = data.find(e => e.SKU ==id)
        res.render('product/edit-form',{jugueteEdit})
    /*do magic*/


    },
    saveEdit: (req,res) =>{
        /*do magic*/
    },
    delete: (req,res)=> {
        /*magic*/
    }



   
}

