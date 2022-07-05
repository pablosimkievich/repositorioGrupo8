const express = require('express');
const app = express();
const path = require('path');
const mainRouter = require('./routes/mainRouter');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');

app.use(express.static(path.join(__dirname,'../public')));

app.set('view engine', 'ejs'); // motor de plantillas ejs

app.set('views','src/views');

app.use(express.urlencoded({ extended: false }));  //capturainfo formulario y si queremos lo pasa json
app.use(express.json());

app.use('/', mainRouter);

app.use( userRouter);

app.use( productRouter);



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

