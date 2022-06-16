const express = require('express');
const app = express();
const path = require('path');


const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));



app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/home.html'))
});

app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/login.html'))
});

app.get('/productCart', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/productCart.html'))
});

app.get('/productCategory', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/productCategory.html'))
});

app.get('/productDetail', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/productDetail.html'))
});

app.get('/register', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/register.html'))
});


app.listen(3031, () => console.log("servidor escuchando puerto 3031 funcionando"))