const path = require('path');
const fs = require('fs');
const dataPath = path.join(__dirname,'../database/jugetes.json');
const data =JSON.parse(fs.readFileSync(dataPath,"UTF-8"));

module.exports = {
    index : (req, res) => {
       let arrayMock = [
        {
            nombre: "Banco didáctico",
            precio: "$ 4800",
            cuotas: "3 cuotas de $1600"
        },
        {
            nombre: "Cocodrilo de arrastre",
            precio: "$ 3200",
            cuotas: "3 cuotas de $1066"
        },
        {
            nombre: "Cohete multifunción",
            precio: "$ 7900",
            cuotas: "3 cuotas de $2630"
        },
        {
            nombre: "Mesa de expresión",
            precio: "$ 4500",
            cuotas: "3 cuotas de $1500"
        },
        {
            nombre: "Torre geométrica",
            precio: "$ 1600",
            cuotas: "3 cuotas de $530"
        },
        {
            nombre: "Carra andador",
            precio: "$ 2500",
            cuotas: "3 cuotas de $830"
        }
       ]

        res.render('home', {arrayMock, arrayMock}); // home ejs 
    },
    indexCategorias: (req, res) => {
        let categorias= [
            {categoria: 'Sensoriales', img:"/img/categoria-6meses.png"},
            {categoria: 'Instrumentos Musicales', img:"/img/categoria-6meses.png"},
            {categoria: 'Rompecabezas', img:"/img/categoria-6meses.png"},
            {categoria: 'Movimientos', img:"/img/categoria-6meses.png"} ,
            {categoria: 'Bloques', img:"/img/pizzaras.png"}
        ]         //en n futuro agregar a base de datos   
        
        res.render('pruebaHome', {data, categorias}); // prueba de pagina home dinamica
    }
}