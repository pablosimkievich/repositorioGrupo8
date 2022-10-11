// const User = require('../database/models/User');
const db = require('../database/models/User');
// const db = require('../database/models/UserType');
// const op = db.Sequelize.Op;


function adminMiddleware (req, res, next) {
        
    if (req.session.userLogged && (db.user_type_id = 2)) {
        let userDetail = req.session.userLogged
         return res.redirect('/users')
    } else {
        res.send("Usted no es un administrador")
    }
    next();
};
module.exports = adminMiddleware;
