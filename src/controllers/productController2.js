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