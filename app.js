const express = require ("express");
const app = express ();
const path = require ("path");
app.listen(3001, () => console.log("servidor escuchando puerto 3001"));

const publicPath =  path.resolve(__dirname, './public');
app.use(express.static(publicPath)); //midelware

app.get("/productCart", function(req,res){
    res.sendFile(path.join(__dirname,"./views/productCart.html")) 
    })

app.get("/register", function(req,res){
     res.sendFile(path.join(__dirname,"./views/register.html")) 
    })

    app.get("/login", function(req,res){
        res.sendFile(path.join(__dirname,"./views/login.html")) 
        })
