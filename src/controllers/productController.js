const { decodeBase64 } = require('bcryptjs');
const db = require('../database/models/index');
const op = db.Sequelize.Op;



const create = async (req, res) => {
    
    const ages = await db.Age.findAll();
    const category = await db.Category.findAll();

    res.render("product/crearProducto", {ages, category}); 
};


const saveNewProduct = async (req, res) => {
     
    let newProduct = {
        name: req.body.name,
        price: req.body.price,
        discount: req.body.discount,
        category_id: req.body.category_id,
        age_id: req.body.age_id,
        principal_img: req.body.principal_img,
        description: req.body.description,
        materials: req.body.materials,
        height: req.body.height,
        width: req.body.width,
        depth: req.body.depth,
        weight: req.body.weight,
        stock: req.body.stock
      };
          
    try {
        await db.Product.create(newProduct);

        const lastProduct = await db.Product.findOne({
            where: {
                name: {
                    [op.like]: `%${req.body.name}%`
                }
            }
        });
        
        let arrayCheck = Array.isArray(req.body.secondary_img)

        if (arrayCheck == true) {
          let newImages = {
            id_product: lastProduct.id,
            image_2: req.body.secondary_img[0],
            image_3: req.body.secondary_img[1],
            image_4: req.body.secondary_img[2],
            }
              
        await db.SecondaryImages.create(newImages);

        res.redirect('/productos');
        } else {

        }

        let newImages = {
            id_product: lastProduct.id,
            image_2: req.body.secondary_img
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
   {
     association: 'reviews',
 },
   
  
     ]})   ;

    
 
    if (juguete) {
      const cuatro = await db.Product.findAll({
         where: { category_id : juguete.category_id},
         limit: 4
      });
      const countReviews = await db.Review.count(
       {
         where: {product_fk_id : juguete.id}
       }
      )
      
     
       const ratingSum = await db.Review.sum('rating', 
       {
         where: {product_fk_id : juguete.id}
       }
      );

      const reviewList = await db.Review.findAll({
        where: {
            product_fk_id: juguete.id
        },
        include: [
            {
                association: 'products'
            },
            {
              association: 'order_detail'
            },  
            {
              association: 'users'
            },           
        ]      
      });
     

   

       res.render("product/productDetail", { juguete, cuatro, countReviews, ratingSum, reviewList});  
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
  
    try {
      
    const product = {
      name,
      price,
      discount,
      category_id,
      principal_img: req.body.principal_img ? req.body.principal_img: jugueteEdit.principal_img,
      description: req.body.description ? req.body.description: jugueteEdit.description,
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

          let arrayCheck = Array.isArray(req.body.secondary_img)
           
          if (arrayCheck == true) {

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
          } else {

            let newImages = {
              id_product:  req.params.id,
              image_2: req.body.secondary_img
                }
            
            await db.SecondaryImages.update(newImages,
              {
                where: {
                    id_product:  req.params.id,
                }
            }
              );
             
              res.redirect(`/juguetes/${req.params.id}`)
            }
               
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
                        id_product: req.params.id
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

