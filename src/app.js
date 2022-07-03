const express = require('express');
const app = express();
const path = require('path');
const mainRouter = require('./routes/mainRouter');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');


const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

app.set('view engine', 'ejs'); // motor de plantillas ejs

app.use('/', mainRouter);

app.use('/users', userRouter);

app.use('/productos', productRouter);



app.set('puerto',process.env.PORT || 3000)

app.listen(app.get('puerto'), ()=>console.log(`Servidor escuchando en puerto ${app.get('puerto')}`));


/*app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/home.html'))
});*/


/*app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/login.html'))
});*/

/*app.get('/productCart', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/productCart.html'))
});*/

/*app.get('/productCategory', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/productCategory.html'))
});*/

/*app.get('/productDetail', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/productDetail.html'))
});*/

/*app.get('/register', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/register.html'))
});*/

