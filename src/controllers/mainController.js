const path =require('path')

const mainController = {
    index : (req, res) => {
        res.render('home'); // home ejs
    }
}

module.exports = mainController;