const db = require('../database/models/index');


const saveNewProduct = async (req, res) => {
    
    let newProduct = {
        name: req.body.nombre,
        price: req.body.precio,
        discount: req.body.descuento,
        category_id: req.body.categoria,
        age_id: req.body.edadRecomendada,
        principal_img: req.body.imagenPrincipal,
        description: req.body.descripcion,
        materials: req.body.materiales,
        height: req.body.altura,
        width: req.body.ancho,
        depth: req.body.profundidad,
        weight: req.body.peso,
        stock: req.body.stock
      };
          
    try {
        await db.Product.create(newProduct);
        let newImages = {
            id_product: ,
            image_2: req.body.imagenesadicionales[0]? req.body.imagenesadicionales[0]: null,
            image_3: (req.body.imagenesadicionales[1])? req.body.imagenesadicionales[1]:null,
            image_4: (req.body.imagenesadicionales[2])? req.body.imagenesadicionales[2]:null,
              }
              if(req.body.imagenesadicionales.lenght){
          await db.SecondaryImages.create(newImages);
              }
        res.redirect('/productos');
    } catch (error) {
        console.log(error);
    }
}

const create = (req, res) => {
        res.render("product/crearProducto"); 
}



module.exports = {
    create,
    saveNewProduct
}