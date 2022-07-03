const path =require('path')

const mainController = {
    index : (req, res) => {
        res.render(path.join(__dirname,'../views/home.ejs')); // home ejs
    }
}

module.exports = mainController;