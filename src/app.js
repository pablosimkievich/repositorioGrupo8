const express = require('express');
const app = express();

require('dotenv').config({path: './.env'});
const mysql = require('mysql2');
const conn = require('express-myconnection');

const path = require('path');
const mainRouter = require('./routes/mainRouter');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const adminRouter = require('./routes/adminRouter');

const apiUserRouter = require('./routes/api/apiUserRouter');
const apiProductRouter = require('./routes/api/apiProductRouter');
const morgan = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const cookies = require('cookie-parser');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
const cors = require('cors')

app.use(express.static(path.join(__dirname,'../public')));

app.set('view engine', 'ejs'); // motor de plantillas ejs
app.set('views','src/views');   // Para no tener que escribir toda la ruta
app.use(morgan('dev'));                  //muestar mas info de errores  
app.use(methodOverride('_method'));        //permite editar datos
app.use(express.urlencoded({ extended: false }));  //capturainfo formulario
app.use(express.json()); // y si queremos lo pasa json
app.use(session({
    secret: "Secreto",
    resave: false,
    saveUninitialized: false
}))

app.use(cookies());
app.use(userLoggedMiddleware);
// const whiteList = ['http://localhost:3001/api/shopping-cart', null]

app.use(cors());

app.use('/', mainRouter);
app.use(userRouter);
app.use(productRouter);
app.use(adminRouter);

app.use(apiUserRouter);
app.use(apiProductRouter);

app.use( (req,res,next) => {
    res.status(404).render('not-found-404');
})

const puerto = process.env.PORT;

const dbConfig = {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || "3306",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "rayuela",
  };
  
app.use(conn(mysql, dbConfig, "single"));

app.set('puerto', process.env.PORT || 3001)
app.listen(app.get('puerto'), ()=>console.log(`Servidor escuchando en puerto ${app.get('puerto')}`));

/* app.listen(puerto, () => {
    console.log('Servidor corriendo en puerto ' + puerto);
}) */


