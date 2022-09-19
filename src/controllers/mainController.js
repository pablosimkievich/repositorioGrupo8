const db = require('../database/models/index');

const op = db.Sequelize.Op;


const index = async (req, res) => {
    const allTheProducts = await db.Product.findAll({
        include: [
            {
                association: 'category'
            },
            {
                association: 'ages'
            },
            {
                association: 'secondary_images'
            }
        ]
    });
    res.render('home', {allTheProducts}); 
};

const indexCategorias = async(req,res) => {
        try{
          const categorias = await db.Category.findAll();
          
          res.render('pruebaHome', {categorias});
        }catch(error){
                console.log(error)
        }

 };

 const indexEdad = async (req, res) => {
    try {
        const edadesRecomendadas = await db.Age.findAll();

        res.render('porEdad', {edadesRecomendadas});

    } catch(error) {
        console.log(error);
    }
 };
 


module.exports = {
    index,
    indexCategorias,
    indexEdad
}