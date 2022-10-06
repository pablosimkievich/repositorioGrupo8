const db = require('../../database/models/index');


const getTheToys = async (req, res) => {
    try {
        const data = await db.Product.findAll()
        const theProductList = data.map(e =>{
            return {
                id: e.id,
                name: e.name,
                price: e.price,
                category_id: e.category_id,
                age_id: e.age_id,
                principal_img: e.principal_img,
                description: e.description,
                materials: e.materials,
                stock: e.stock,
                detail: `http://localhost:3000/productos/${e.id}`
                }
        })
        const count = await db.Product.count();
        
        res.status(200).json({count, theProductList})
    } catch(error){
            console.log(error);
    }
}


const getTheToyDetail = async (req, res) => {
    try {
        const id = req.params.id
        const productDetail = await db.Product.findByPk(id, {
            include: [
                {
                    association: 'order_detail'
                },
                {
                    association: 'reviews'
                },  
                {
                    association: 'secondary_images'
                },
                {
                    association: 'category'
                },
                {
                    association: 'ages'
                }      
            ]
        })

        if (productDetail) {
            res.status(200).json(productDetail);
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