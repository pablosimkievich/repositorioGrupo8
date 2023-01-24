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

        const countEdad6meses1Anio = await db.Product.count({
            where: {
                age_id: 1
            }
        })

        const countEdad1anio3Anios = await db.Product.count({
            where: {
                age_id: 2
            }
        })

        const countEdad3a6Anios = await db.Product.count({
            where: {
                age_id: 3
            }
        })

        const countEdadmasDe6Anios = await db.Product.count({
            where: {
                age_id: 4
            }
        })


        countByCategory = {
            sensoriales: countSensoriales,
            musicales: countMusicales,
            ingenio: countIngenio,
            movimientos: countMovimientos,
        }

        countByAges = {
            edad6meses1Anio: countEdad6meses1Anio,
            edad1anio3Anios: countEdad1anio3Anios,
            edad3a6Anios: countEdad3a6Anios,
            edadmasDe6Anios: countEdadmasDe6Anios

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
      


const agesedad6MesesA1Anio = await db.Product.findAll({
    where: {
        age_id: 1
    },
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

const edad6MesesA1Anio = agesedad6MesesA1Anio.map( e => {
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

const agesedad1AnioA3Anios = await db.Product.findAll({
    where: {
        age_id: 2
    },
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

const edad1AnioA3Anios = agesedad1AnioA3Anios.map( e => {
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

const agesedad3A6Anios = await db.Product.findAll({
    where: {
        age_id: 3
    },
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

const edad3A6Anios = agesedad3A6Anios.map( e => {
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

const agesedadMasDe6Anios = await db.Product.findAll({
    where: {
        age_id: 4
    },
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

const edadMasDe6Anios = agesedadMasDe6Anios.map( e => {
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
        
const juguetesXEdad = {
    ages1: edad6MesesA1Anio,
    ages2: edad1AnioA3Anios,
    ages3: edad3A6Anios,
    ages4: edadMasDe6Anios
}       
           

        res.status(200).json({count, countByCategory, countByAges, products, juguetesXCategoria, juguetesXEdad })
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

const getUserToysCart = async function(req, res) {
    try {
        console.log('hola que tal')
        console.log(req.body)
    } catch(error) {
        console.log(error);
    }
}

const fetching = function(req, res) {

    res.render('users/fetch')
}

const fetching2 = async function(req, res) {
    try {
        console.log('holas')
    } catch(error) {
        console.log(error)
    }
        
}    


/* "http://localhost:3001/api/shopping-cart" */

module.exports = {
    getTheToys,
    getTheToyDetail,
    getUserToysCart,
    fetching,
    fetching2
}