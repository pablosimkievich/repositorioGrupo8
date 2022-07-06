const path = require('path');
const fs = require('fs');
const dataPath = path.join(__dirname,'../database/jugetes.json');
const data =JSON.parse(fs.readFileSync(dataPath,"UTF-8"));

module.exports = {
    index : (req, res) => {
        let categorias= 
            [{categoria: 'Sensoriales', img:"/img/categoria-rompecabezas.png"},
            {categoria: 'Instrumentos Musicales', img:"/img/instrumentos.png"},
            {categoria: 'Rompecabezas', img:"/img/categoria-rompecabezas.png"},
            {categoria: 'Movimientos', img:"/img/categoria-movimientos.png"} ,
        ]         //en un futuro agregar a base de datos
        

        res.render('pruebaHome', {data, categorias}); // prueba de pagina home dinamica
        //res.render('home', {data}); // home ejs
    }
}