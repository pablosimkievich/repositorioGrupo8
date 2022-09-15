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
        principal_img: req.body.principal_img,
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
            image_2: (req.body.secondary_img[0])? (req.body.secondary_img[0]): null,
            image_3: (req.body.secondary_img[1])? (req.body.secondary_img[1]): null,
            image_4: (req.body.secondary_img[2])? (req.body.secondary_img[2]): null,
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
         
      res.render("product/productDetail", { juguete, cuatro});  
    }else {
      res.send("No existe el juguete");
    };

  } catch(error){
    console.log(error)
      }
};

 const edit = async (req, res) => {
     try{
    let jugueteEdit = await db.Product.findByPk(req.params.id) 
    res.render("product/edit-form", { jugueteEdit });
    }catch(error){
      alert(error)
    }
    };
 const saveEdit = async (req, res) => {
  let jugueteEdit = await db.Product.findByPk(req.params.id) 
      const {
        name,
        price,
        discount,
        category_id,
        principal_img,
        description,
        age_id,
        materials,
        width,
        height,
        depth,
        weight,
        stock
      } = req.body;
  
     
      try{
      
  
    const product = {
      name,
      price,
      discount,
      category_id,
      principal_img: req.file? req.file.filename: jugueteEdit.principal_img,
      description,
      age_id,
      materials,
      width,
      height,
      depth,
      weight,
      stock
    }
          
          await db.Product.update(product,
            {
              where: {
                  id: req.params.id,
              }
          });

           
       let newImages = {
          id_product:  req.params.id,
          image_2: req.body.secondary_img[0],
          image_3:  req.body.secondary_img[1],
          image_4: req.body.secondary_img[2],
            }
            
              
          await db.SecondaryImages.update(newImages,
            {
              where: {
                  id_product:  req.params.id,
              }
          }
            );
           
            res.redirect(`/juguetes/${req.params.id}`)
          
       
    
    } catch(error){
    console.log(error)
  }
};


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
  };
  const getCategory = async (req,res)=>{
    try{
     const juguetesCategoria = await db.Product.findAll(
        {
          where: {
                  category_id : req.params.categoria
                 }
                 , 
                 
          include: [{
                    association: 'category',
                }          
                            ]})
         res.render("product/categoria", { juguetesCategoria });

    }catch(error){
      console.log(error)}

  }
   
  const getEdad =  async (req,res)=>{
    try{
     const juguetesXedad =  await db.Product.findAll(
    {
      where: {
              age_id : req.params.edadrecomendada
             }
             , 
             
      include: [{
                association: 'ages',
            }          
                        ]})
                   
                   
     res.render("product/edades", { juguetesXedad });

}catch(error){
  console.log(error)}

}

const search = async (req, res) => {
    try {
      let searchKeyword = req.query.keywords;

      if (searchKeyword) {
    
        let searchResult = await db.Product.findAll({
          where: {
            name: {
              [op.like]: `%${searchKeyword}%` 
            }  
          }
        });

          if (searchResult.length >= 1) {
            res.render('product/searchResults', {searchResult});
          } else if (searchResult.length < 1) {
            let searchResult = 0;
            res.render('product/searchResults', {searchResult});
          }
        
      } else if (!searchKeyword) {
        let searchResult = 0;
        res.render('product/searchResults', {searchResult});
      }

    } catch (error) {
      console.log(error);
    }
}



module.exports = {
    create,
    saveNewProduct,
    productList,
    productDetail,
    edit,
    saveEdit,
    productPanel,
    deleteProduct,
    getCategory,
    getEdad,
    search
}

