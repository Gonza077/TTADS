const Usuario = require('../Schema/userSchema');
const jwt = require('jsonwebtoken');
const db = require('./DB');

exports.addUsuario = async (req, res) => {
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

exports.signIn = async (req, res) => {
    db.connectDB();
    Usuario.findOne({
        usuario: req.body.usuario,
        contrasena: req.body.contrasena
    })
        .then((user) =>{
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

exports.listUsuario = async (req, res) => {
    db.connectDB()
    //ESTO CON EL WEBTOKEN SE PUEDE VALIDAR PARA SABER SI ES EL ADMIN O NO
    Usuario.find()
        .then(usuarios =>{
            usersFilter = usuarios.filter(user => user.usuario !="admin")
            res.send(usersFilter);
            //res.send(usuarios);
        })
        .catch((error) =>{
            console.log(error);
            res.status(500).send('Hubo un error al buscar el listado de usuarios');
        })
        .finally(() =>{
            db.disconnectDB();
        })
};

exports.getUsuario = async (req, res) => {
    db.connectDB();
    //VER SI ESTO SE PUEDE RESUMIR DE OTRA FORMA---CREO QUE SE PUEDE CAMBIAR CON EL ID QUE VIENE CON EL REQUEST
    const payload = jwt.verify(req.params.id, 'secretKey');
    Usuario.findById(payload)
        .then((user) => {
            if(user){
                return res.json(user)
            }
            res.status(400).send("El usuario buscado no existe");
        })
        .catch((error) =>{
            console.log(error);
            res.status(500).send('Hubo un error al buscar un usuario');
        })
        .finally(() =>{
            db.disconnectDB();
        })
};

exports.deleteUsuario = async (req, res) => {
    db.connectDB();
    Usuario.findOneAndRemove({ 
        _id : req.params.id,
    })
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

exports.updateUsuario = async (req, res) => {
    db.connectDB();
    //ESTO FALTA TESTEAR SI FUNCIONA
    Usuario.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
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


