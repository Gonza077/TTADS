const Usuario = require('../Schema/userSchema');
const jwt = require('jsonwebtoken');
const db = require('./DB');

exports.addUser = async (req, res) => {
    db.connectDB();
    new Usuario(req.body).save()
    .then((user)=>{
        const token = jwt.sign({ _id: user._id }, 'secretKey');
        return res.status(200).send({ token });           
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
    Usuario.findOne( {usuario: req.body.usuario, contrasena: req.body.contrasena} )
    .then( (user) =>{
        if(user){
            const token = jwt.sign({ _id: user._id }, 'secretKey');
            return res.status(200).json({token});  
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
    Usuario.findOne( { _id : userId} )
    .then((user) => {        
        if(user){
            return res.status(200).json(user);
        }
        res.status(400).json("El usuario buscado no existe");
    })
    .catch((error) =>{
        console.log(error);
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
        res.status(200).send('Usuario eliminado con exito.');
    })
    .catch((error) =>{
        console.log(error);
        res.status(500).send('Hubo un error al eliminar el usuario');
    })
    .finally(() =>{
        db.disconnectDB();
    })
}

exports.updateUser = async (req, res) => {
    db.connectDB();
    //ESTO FALTA TESTEAR SI FUNCIONA
    console.log(req);
    Usuario.findOneAndUpdate( { _id: req.body.id }, req.body, { new: true })
    .then(()=>{   
        res.status(200).json("Usuario Editado");
    })
    .catch((error) =>{
        console.log(error);
        res.status(500).send('Hubo un error al editar el usuario');
    })
    .finally(() =>{
        db.disconnectDB();
    })
};


