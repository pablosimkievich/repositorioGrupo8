const db = require('../database/models/index');
const op = db.Sequelize.Op;



const create = async (req, res) => {
    
    const ages = await db.Age.findAll();
    const category = await db.Category.findAll();

    res.render("product/crearProducto", {ages, category}); 
};


const saveNewProduct = async (req, res) => {
    
    let category_id

    if (req.body.categoria == "Sensoriales") {
        category_id =  1;
    } else if (req.body.categoria == "Musicales") {
        category_id =  2;
    } else if (req.body.categoria == "Rompecabezas") {
        category_id =  3;
    } else if (req.body.categoria == "Movimientos") {
        category_id =  4;
    }

    console.log(category_id)

    let age_id

    if (req.body.ages == "De 6 meses a 1 año") {
        category_id =  1;
    } else if (req.body.ages == "De 1 año a 3 años") {
        category_id =  2;
    } else if (req.body.ages == "De 3 a 6 años") {
        category_id =  3;
    } else if (req.body.ages == "Mas de 6 años") {
        category_id =  4;
    }


    let newProduct = {
        name: req.body.nombre,
        price: req.body.precio,
        discount: req.body.descuento,
        category_id: category_id,
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

        const lastProduct = await db.Product.findOne({
            where: {
                name: {
                    [op.like]: req.body.nombre
                }
            }
        });

        let newImages = {
            id_product: lastProduct.id,
            image_2: req.body.imagenesAdicionales[0],
            image_3: req.body.imagenesAdicionales[1],
            image_4: req.body.imagenesAdicionales[2],
              }
              
          await db.SecondaryImages.create(newImages);

        res.redirect('/productos');
    } catch (error) {
        console.log(error);
    }
};



module.exports = {
    create,
    saveNewProduct
};