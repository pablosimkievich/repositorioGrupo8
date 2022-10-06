// ? middleware funciona, desactivado por fines prácticos


function onlyAdminMiddleware (req, res, next) {
/*    if (!req.session.userLogged) {
        return res.redirect('/')
        
    } else if (req.session.userLogged.user_type_id !== 2){
        return res.redirect('/')
    } */

    next();
};

module.exports = onlyAdminMiddleware;