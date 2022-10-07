function authMiddleware (req, res, next) {
    if (!req.session.userLogged) {
        return res.redirect('/login');
    } else if (req.session.userLogged && req.session.userLogged.id != req.params.id) {
        return res.redirect('/');
    }
    next();
};

module.exports = authMiddleware;