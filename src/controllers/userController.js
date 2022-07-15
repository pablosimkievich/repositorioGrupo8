const path = require('path');
//const login= path.join(__dirname,'/views/users/login')
const fs = require('fs');
const { markAsUntransferable } = require('worker_threads');
const pathUserDB = path.join(__dirname, '../database/users.json');
const userDB = JSON.parse(fs.readFileSync(pathUserDB, 'utf-8'));

const allUsers = userDB.map ( e => {
    return {
        id: e.id,
        nombre: e.nombre,
        apellido: e.apellido,
        email: e.email,
        telefono: e.telefono,
        domicilio: e.domicilio,
        password: e.password,
        confirmPassword: e.confirmPassword,
        fotoPerfil: e.fotoPerfil
    }
});



const userController = {
    login : (req, res) => {
       res.render(path.join(__dirname,'../views/users/login')) // login ejs
    },
    registro : (req, res) => {
        res.render(path.join(__dirname,'../views/users/register.ejs')) // registro.ejs
    },
    productCart : (req, res) => {
        res.render(path.join(__dirname,'../views/users/productCart.ejs')) //  productCart.ejs
    },
    userCreate: (req, res) => {
        let readJSON = fs.readFileSync(pathUserDB, 'utf-8');
        let jsonParseado = JSON.parse(readJSON);
        
        const id = jsonParseado[jsonParseado.length - 1].id;
        const newId = id + 1;

        let newUser = {
            id: newId,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            telefono: req.body.telefono,
            domicilio: req.body.domicilio,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            fotoPerfil: req.body.fotoPerfil
        }


        let newUserlist = [...jsonParseado, newUser];
        // let newUserList = userDB.push(newUser);
        let newUserListString = JSON.stringify(newUserlist, null, ' ');

        let guardar = fs.writeFileSync(pathUserDB, newUserListString)
        guardar

        res.redirect('/login');
    },
    quienesSomos : (req,res) => {
        res.render (path.join(__dirname,'../views/users/quienesSomos.ejs'))  //quienesSomos.ejs
    },

    preguntasFrecuentes : (req,res) => {
        res.render (path.join(__dirname,'../views/users/preguntasFrecuentes.ejs')) //preguntasFrecuentes.ejs
    },

    contacto : (req,res) => {
        res.render (path.join(__dirname,'../views/users/contacto.ejs')) //contacto.ejs
    },
    usersList: (req, res) => {
        res.render('users/userList', {allUsers})
        
    },
    userEdit: (req, res) => {
        const id = parseInt(req.params.id);
        const userEdit = allUsers.find( e => e.id === id);
        //res.send(`formulario de edición de usuario ${id}`)
        res.render('users/userEdit', {userEdit})  //  pagina de deición de usuario
    },
    userEditSave: (req, res) => {
        const nuevoId = parseInt(req.body.id);
        const nuevoNombre = req.body.nombre;
        const nuevoApellido = req.body.apellido;
        const nuevoEmail = req.body.email;
        const nuevoTelefono = req.body.telefono;
        const nuevoDomicilio = req.body.domicilio;
        const nuevopassword = req.body.password;
        const nuevoconfirmpassword = req.body.confirmPassword;

        allUsers.map( e => {
            if (e.id == nuevoId) {
                e.id = nuevoId
                e.nombre = nuevoNombre;
                e.apellido = nuevoApellido;
                e.email = nuevoEmail;
                e.telefono = nuevoTelefono;
                e.domicilio = nuevoDomicilio;
                e.password = nuevopassword;
                e.confirmPassword = nuevoconfirmpassword;
            }
        });

        fs.writeFile(pathUserDB, JSON.stringify(allUsers, null, " "), (error) => {
            if (error) {
                res.send(error);
            } else {
                res.redirect('/usuarios')
            }
            
        })
    },
    userDelete: (req, res) => {
        const id = parseInt(req.params.id);
        const newUsers = allUsers.filter( e => e.id != id);

        fs.writeFile(pathUserDB, JSON.stringify(newUsers, null, " "), (error) => {
            if (error) {
                res.send('Error ' + error);
            } else {
                let newDB = JSON.parse(fs.readFileSync(pathUserDB, 'utf-8'));
                
                const allUsers = newDB.map ( e => {
                    return {
                        id: e.id,
                        nombre: e.nombre,
                        apellido: e.apellido,
                        email: e.email,
                        telefono: e.telefono,
                        domicilio: e.domicilio,
                        password: e.password,
                        confirmPassword: e.confirmPassword,
                        fotoPerfil: e.fotoPerfil
                    }
                });
                
                res.render('users/userList', {allUsers})
            }
        })


        //res.send('Borrar usuario')

    },
    userDetail: (req, res) => {
        const id = parseInt(req.params.id);
        const userDetail = allUsers.find( e => e.id === id);
        if (userDetail) {
            res.render('users/userDetail', {userDetail});
        } else {
            res.send(`No se encontro a usuario ${id}`);
        }
            
        
    }
 };


module.exports = userController;
