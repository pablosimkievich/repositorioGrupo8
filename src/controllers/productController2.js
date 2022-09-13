const db = require('../database/models/index');
const op = db.Sequelize.Op;



const create = async (req, res) => {
    
    const ages = await db.Age.findAll();
    const category = await db.Category.findAll();

    res.render("product/crearProducto", {ages, category}); 
};


const saveNewProduct = async (req, res) => {
    
    
    let newProduct = {
        name: req.body.nombre,
        price: req.body.precio,
        discount: (req.body.descuento)?req.body.descuento: 0,
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

        const lastProduct = await db.Product.findOne({
            where: {
                name: {
                    [op.like]: req.body.nombre
                }
            }
        });

        let newImages = {
            id_product: lastProduct.id,
            image_2: (req.body.imagenesAdicionales[0])? (req.body.imagenesAdicionales[0]): null,
            image_3: (req.body.imagenesAdicionales[1])? (req.body.imagenesAdicionales[1]): null,
            image_4: (req.body.imagenesAdicionales[2])? (req.body.imagenesAdicionales[2]): null,
              }
              
          await db.SecondaryImages.create(newImages);

        res.redirect('/productos');
    } catch (error) {
        console.log(error);
    }
};
const productList =  async (_req, res) => {
    try {
        const data = await db.Product.findAll()
        res.render("product/productos", { data })
    } catch(error){
            console.log(error);
    }
    
  };
  const productDetail= async (req, res) => {                                        
   try{
     let id = req.params.id;
     
    const juguete = await db.Product.findByPk(id, {
      include: [{
        association: 'category',
    },
    {
        association: 'ages',
        
    },
    {
      association: 'secondary_images',
  },
 
    ]})   ;
  

   if (juguete) {
     const cuatro = await db.Product.findAll({
        where: { category_id : juguete.category_id},
        limit: 4
     })
         
      res.render("product/productDetail", { juguete, cuatro});  }         
     else {
      res.send("No existe el juguete");
    }
  } catch(error){
    console.log(error)
  }};

 const edit = async (req, res) => {
     try{
    let jugueteEdit = await db.Product.findByPk(req.params.id) 
    res.render("product/edit-form", { jugueteEdit });
    }catch(error){
      alert(error)
    }
    };
    const saveEdit = async (req, res) => {
      
      const {
        id,
        name,
        price,
        discount,
        category_id,
        principl_img,
        description,
        age_id,
        materials,
        width,
        height,
        depth,
        weight
      } = req.body;
  
  
      try{
        product = await db.Product.findByPk(req.params.id)
  
      if (product) {
          product.id = req.params.id;
          product.name = name;
          product.price = price;
          product.discount = discount;
          product.category_id=  category_id;
          product.principal_img = principal_img;
          product.description= description;
          product.age_id= age_id;
          product.materials= materials;
          product.height= height;
          product.width= width;
          product.depth= depth;
          
          await db.Product.create(product);

        const lastProduct = await db.Product.findOne({
            where: {
                name: {
                    [op.like]: req.body.name
                }
            }
        });

        
        let newImages = {
          id_product: lastProduct.id,
          image_2: (req.body.imagenesAdicionales[0])? (req.body.imagenesAdicionales[0]): product.SecondaryImages.img_2,
          image_3: (req.body.imagenesAdicionales[1])? (req.body.imagenesAdicionales[1]): product.SecondaryImages.img_3,
          image_4: (req.body.imagenesAdicionales[2])? (req.body.imagenesAdicionales[2]): product.SecondaryImages.img_4,
            }
            
              
          await db.SecondaryImages.create(newImages);

          
        } else {
        res.sendStatus(404);
      }
  
      fs.writeFile(dataPath, JSON.stringify(data), (error) => {
        if (error) {
          res.send(error);
        } else {
          res.redirect("/");
        }
      });
    } catch(error){
    console.log(error)
  }
}



  const productPanel = async (_req, res) => {
    try {
        const data = await db.Product.findAll()
        res.render("product/ProductPanel", { data })
    } catch(error){
            console.log(error);
    }
    
  }; 
  const deleteProduct = async (req, res) => {
    
try{
  await  db.SecondaryImages.destroy({
    where: {
      id_product : req.params.id
    }
  });
    await db.Product.destroy({
      where: {
        id: req.params.id
      }
    });
    
    res.redirect('/productPanel')
    } catch(error){
      console.log(error)
    };
  }


module.exports = {
    create,
    saveNewProduct,
    productList,
    productDetail,
    edit,
    productPanel,
    deleteProduct,

}