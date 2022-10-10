const db = require('../database/models/index');
const op = db.Sequelize.Op;

/**
* ?   En caso de que el usuario este logueda, si el usuario entre a localhot:3000/login
* ? se lo redirije a su detalle de usuario. Para acceder a su detalle de usuario desde acá hay que 
* ? buscar datos de dos tablas, User, y Order, por si el user tiene compras hechas.
**/

async function guestMiddleware (req, res, next) {
    
    if (req.session.userLogged) {
        // let id = req.session.userLogged.id
        let user = req.session.userLogged
        let id = user.id
        let userDetail = await db.User.findByPk(id, {
            include: [
                {
                    association: 'orders'
                },
                {
                    association: 'order_detail'
                }
            ]
        }); 

        const orders = await db.Order.findAll({
            where: {
                user_id: id
            }
        })

        return res.render('users/userDetail', { userDetail, orders });
    }
    next();
};

module.exports = guestMiddleware;