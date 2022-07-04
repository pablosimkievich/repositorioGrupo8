

const path = require('path');
const fs = require('fs');

const productController = {
    productList: (req,res)=> {
        res.render(path.join(__dirname,'../views/product/products') ) // products.ejs
    },
    productDetail:  (req,res)=> {
        let juguetes = [ { SKU: 525,
            nombre: 'Kit instrumentos Musicales',
        precio: 4500,
        enPromo: 'no',
        descuento: 0,
        categoria: 'Instrumentos Musicales', 
        imagenPrincipal: "#",
        imagenesAdicionales: '#',
        descripcion: 'descripciones',
        edadRecomendada: 'mas de 3 años',
        materiales: 'Metal y madera',
        altura: 15,
        ancho: 10,
        profundidad:5
        }, { SKU: 527,
            nombre: 'Kit instrumentos Musicales',
        precio: 4500,
        enPromo: 'no',
        descuento: 0,
        categoria: 'Instrumentos Musicales', 
        imagenPrincipal: "#",
        imagenesAdicionales: '#',
        descripcion: 'descripciones',
        edadRecomendada: 'mas de 3 años',
        materiales: 'Metal y madera',
        altura: 15,
        ancho: 10,
        profundidad:5
        }]
        res.render(path.join(__dirname,'../views/product/productDetail'), {'juguetes' : juguetes} )  // productDetail.ejs
    },
    
    crearProducto: (req, res)=> {
        res.render(path.join(__dirname,'../views/product/crearProducto'));           // vemos el form en crearProducto.ejs
    
    },
    guardar: (req, res)=> {
        let jugueteCreado = {
                        SKU: req.body.SKU,
                        nombre: req.body.nombre,
                        precio: req.body.precio,
                        enPromo: req.body.enPromo,
                        descuento: req.body.descuento,
                        categoria: req.body.categoria, 
                        imagenPrincipal: req.body.imagenPrincipal,
                        imagenesAdicionales: req.body.imagenesAdicionales,
                        descripcion: req.body.descripcion,
                        edadRecomendada: req.body.edadRecomendada,
                        materiales: req.body.materiales,
                        altura: req.body.altura,
                        ancho: req.body.ancho,
                        profundidad: req.body.profundidad
                    }

                    let archivojuguetes = fs.readFileSync('../database/jugetes.json', {encoding: 'UTF-8'});
                    let juguetes
                    if(archivojuguetes == ''){
                        juguetes =[];
                    }else {
                        juguetes = JSON.parse(archivojuguetes);
                    }
                    juguetes.push(jugueteCreado)

                    let juguetesJSON = JSON.stringyfy(juguetes);


                    fs.writeFileSync('../database/jugetes.json', juguetesJSON);       

                    res.redirect(path.join(__dirname,'/src/views/home'))

        },
}

module.exports = productController;