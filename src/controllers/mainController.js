const db = require('../database/models/index');
const op = db.Sequelize.Op;


const index = async (req, res) => {
  try {
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
      ],
      limit: 9,
      order: [
        ["price", "DESC"],
        [ "stock", "ASC"],
      ]
      
  });

  const categorias = await db.Category.findAll();
  const edadesRecomendadas = await db.Age.findAll();

  res.render('home', {allTheProducts, categorias, edadesRecomendadas}); 
  } catch(error) {
    console.log(error);
  }
  
};

 
 const searchByUser = async (req, res) => {
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
            res.render('searchByUser', {searchResult});
          } else if (searchResult.length < 1) {
            let searchResult = 0;
            res.render('searchByUser', {searchResult});
          }
        
      } else if (!searchKeyword) {
        let searchResult = 0;
        res.render('searchByUser', {searchResult});
      }

    } catch (error) {
      console.log(error);
    }
}



module.exports = {
    index,
    searchByUser
}