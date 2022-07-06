const path = require('path');
const fs = require('fs');
const dataPath = path.join(__dirname,'../database/jugetes.json');
const data =JSON.parse(fs.readFileSync(dataPath,"UTF-8"));

module.exports = {
    index : (req, res) => {
        let categorias= 
            [{categoria: 'Sensoriales', img:"/img/categoria-6meses.png"},
            {categoria: 'Instrumentos Musicales', img:"/img/categoria-6meses.png"},
            {categoria: 'Rompecabezas', img:"/img/categoria-6meses.png"},
            {categoria: 'Movimientos', img:"/img/categoria-6meses.png"} ,
            {categoria: 'Bloques', img:"/img/pizzaras.png"}

        ]         //en n futuro agregar a base de datos
        

        res.render('pruebaHome', {data, categorias}); // prueba de pagina home dinamica
        //res.render('home', {data}); // home ejs
    }
}