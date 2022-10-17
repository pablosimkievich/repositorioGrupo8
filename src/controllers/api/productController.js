const db = require('../../database/models/index');
const op = db.Sequelize.Op;


const getTheToys = async (req, res) => {
    try {
        const data = await db.Product.findAll({
            include: [
                {
                    association: 'category'
                },
                {
                    association: 'ages'
                },
                {
                    association: 'reviews'
                }
            ]
        })
        let products = data.map(e =>{
            
            return {
                id: e.id,
                name: e.name,
                price: e.price,
                category: e.category.category_name,
                reviews: e.reviews,
                ratings: e.reviews.map(e=>e.rating),
                age: e.ages.recommended_age,
                description: e.description,
                img: `http://localhost:3001/../../../img/products/${e.principal_img}`,
                detail: `http://localhost:3001/juguetes/${e.id}`
                }
        })

        const count = await db.Product.count();
        const countSensoriales = await db.Product.count({
            where : {
                category_id: 1
            }   
        });

        const countMusicales = await db.Product.count({
            where : {
                category_id: 2
            }   
        });

        const countIngenio = await db.Product.count({
            where : {
                category_id: 3
            }   
        });

        const countMovimientos = await db.Product.count({
            where : {
                category_id: 4
            }   
        });

        countByCategory = {
            sensoriales: countSensoriales,
            musicales: countMusicales,
            ingenio: countIngenio,
            movimientos: countMovimientos,
        }

     const categoriaSensoriales = await db.Product.findAll(
                {
                  where: {
                          category_id : 1
                         }
                         , 
                         
                  include: [{
                                association: 'category'
                            },
                            {
                                association: 'ages'
                            },
                            {
                                association: 'reviews'
                            }
                                 
                                    ]});

     const sensoriales = categoriaSensoriales.map(e =>{
            
                                                            return {
                                                                id: e.id,
                                                                name: e.name,
                                                                price: e.price,
                                                                category: e.category.category_name,
                                                                reviews: e.reviews,
                                                                ratings: e.reviews.map(e=>e.rating),
                                                                age: e.ages.recommended_age,
                                                                description: e.description,
                                                                img: `http://localhost:3001/../../../img/products/${e.principal_img}`,
                                                                detail: `http://localhost:3001/juguetes/${e.id}`
                                                                }
                                                        });


 const categoriaMusicales = await db.Product.findAll(
                                                     {
                                                       where: {
                                                                      category_id : 2
                                                                     }
                                                                     , 
                                                                     
                                                              include: [{
                                                                            association: 'category'
                                                                        },
                                                                        {
                                                                            association: 'ages'
                                                                        },
                                                                        {
                                                                            association: 'reviews'
                                                                        }
                                                                             
                                                                                ]});
                    
             const musicales = categoriaMusicales.map(e =>{
            
                                                                                    return {
                                                                                        id: e.id,
                                                                                        name: e.name,
                                                                                        price: e.price,
                                                                                        category: e.category.category_name,
                                                                                        reviews: e.reviews,
                                                                                        ratings: e.reviews.map(e=>e.rating),
                                                                                        age: e.ages.recommended_age,
                                                                                        description: e.description,
                                                                                        img: `http://localhost:3001/../../../img/products/${e.principal_img}`,
                                                                                        detail: `http://localhost:3001/juguetes/${e.id}`
                                                                                        }
                                                                                });                                        

 const categoriaIngenio = await db.Product.findAll(
                                                                                    {
                                                                                      where: {
                                                                                                     category_id : 3
                                                                                                    }
                                                                                                    , 
                                                                                                    
                                                                                             include: [{
                                                                                                           association: 'category'
                                                                                                       },
                                                                                                       {
                                                                                                           association: 'ages'
                                                                                                       },
                                                                                                       {
                                                                                                           association: 'reviews'
                                                                                                       }
                                                                                                            
                                                                                                               ]});
  
 const categoriaMovimientos = await db.Product.findAll(
    {
      where: {
                     category_id : 4
                    }
                    , 
                    
             include: [{
                           association: 'category'
                       },
                       {
                           association: 'ages'
                       },
                       {
                           association: 'reviews'
                       }
                            
                               ]}); 

 
  

 const ingenio = categoriaIngenio.map(e =>{
                                                       return {
                                                                                                id: e.id,
                                                                                                name: e.name,
                                                                                                price: e.price,
                                                                                                category: e.category.category_name,
                                                                                                reviews: e.reviews,
                                                                                                ratings: e.reviews.map(e=>e.rating),
                                                                                                age: e.ages.recommended_age,
                                                                                                description: e.description,
                                                                                                img: `http://localhost:3001/../../../img/products/${e.principal_img}`,
                                                                                                detail: `http://localhost:3001/juguetes/${e.id}`
                                                                                                }
                                                                                            })


    
 const movimientos = categoriaMovimientos.map(e =>{
    
    return {
        id: e.id,
        name: e.name,
        price: e.price,
        category: e.category.category_name,
        reviews: e.reviews,
        ratings: e.reviews.map(e=>e.rating),
        age: e.ages.recommended_age,
        description: e.description,
        img: `http://localhost:3001/../../../img/products/${e.principal_img}`,
        detail: `http://localhost:3001/juguetes/${e.id}`
        }
    })
      
const juguetesXCategoria = {
        sensoriales: sensoriales,
        musicales: musicales,
        ingenio: ingenio,
        movimientos: movimientos
      }         
        
          
           

        res.status(200).json({count, countByCategory, products, juguetesXCategoria})
    } catch(error){
            console.log(error);
    }
}


const getTheToyDetail = async (req, res) => {
    try {
        const id = req.params.id
        let productDetail = await db.Product.findByPk(id, {
            include: [
                {
                    association: 'category'
                },
                {
                    association: 'ages'
                },
                {
                    association: 'reviews'
                }
            ]
        })

        let product = productDetail = {
            id: productDetail.id,
            name: productDetail.name,
            price: productDetail.price,
            discount: productDetail.discount,
            category: productDetail.category.category_name,
            age: productDetail.ages.recommended_age,
            description: productDetail.description,
            materials: productDetail.materials,
            height: productDetail.height,
            width: productDetail.width,
            weight: productDetail.weight,
            stock: productDetail.stock,
            img: `http://localhost:3001/../../../img/products/${productDetail.principal_img}`,
    
            };

        if (productDetail) {
            res.status(200).json(product);
        } else {
            res.status(200).json(`No existe el producto Nro: ${id}`)
        }
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getTheToys,
    getTheToyDetail
}