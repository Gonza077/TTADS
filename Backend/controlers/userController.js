const Usuario = require('../Schema/userSchema');
//const jwt = require('jsonwebtoken');
const db = require('./DB');

exports.addUser = async (req, res) => {
    db.connectDB();
    new Usuario(req.body).save()
    .then(( user )=>{
        return res.status(200).json("Usuario creado con exito");           
    })
    .catch(error =>{
        console.log(error)
        res.status(500).send("Hubo un error al agregar el usuario")
    })
    .finally(()=>{
        db.disconnectDB()
    });
};

exports.login = async (req, res) => {
    db.connectDB();
    Usuario.findOne({
        userName: req.body.userName, 
        password: req.body.password
    })
    .then( (user) =>{
        if(user){
            return res.status(200).json("Usuario logeado con exito");  
        }
        return res.status(401).send("El usuario y/o contraseña ingresados no son correctos");
    })
    .catch(error =>{
        console.log(error);
        res.status(401).send("Error al realizar el login");
    })
    .finally(() =>{
        db.disconnectDB();           
    }); 
};

exports.getUsers = async (req, res) => {
    db.connectDB();
    Usuario.find()
    .then(usuarios =>{
        res.send(usuarios);
    })
    .catch((error) =>{
        console.log(error);
        res.status(500).send('Hubo un error al buscar el listado de usuarios');
    })
    .finally(() =>{
        db.disconnectDB();
    })
};

exports.getUser = async (req, res) => {
    db.connectDB();
    let userId = req.params.idUser;
    //const payload = jwt.verify(req.params.idUser, 'secretKey');
    Usuario.findOne({ 
        _id : userId
    })
    .then((user) => {        
        if(user){
            return res.status(200).json(user);
        }
        res.status(400).json("El usuario buscado no existe");
    })
    .catch((error) =>{
        res.status(500).send('Hubo un error al buscar un usuario');
    })
    .finally(() =>{
        db.disconnectDB();
    })
};

exports.deleteUser = async (req, res) => {
    db.connectDB();
    Usuario.findOneAndRemove( { _id : req.params.idUser} )
    .then(() =>{
        res.status(200).json('Usuario eliminado con exito.');
    })
    .catch((error) =>{
        res.status(500).send('Hubo un error al eliminar el usuario');
    })
    .finally(() =>{
        db.disconnectDB();
    })
}

exports.updateUser = async (req, res) => {
    db.connectDB();
    Usuario.findOneAndUpdate(
        { _id: req.body.id }, 
        req.body
    )
    .then(()=>{ 
        res.status(200).json("Usuario editado");
    })
    .catch((error) =>{
        console.log(error);
        res.status(500).send('Hubo un error al editar el usuario');
    })
    .finally(() =>{
        db.disconnectDB();
    })
};


