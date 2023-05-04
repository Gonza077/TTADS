const mongoose = require('mongoose');
const db = require('./DB');
const Usuario = require('../Schema/userSchema');
const Order = require("../Schema/orderSchema");
const Local = require('../Schema/localSchema');
//const jwt = require('jsonwebtoken');


exports.addUser = async (req, res) => {
    db.connectDB();
    await new Usuario(req.body).save()
        .then((data) => {
            return res.status(200).json(data);
        })
        .catch(error => {
            res.status(500).json(error)
        })
        .finally(() => {
            db.disconnectDB()
        });
};

exports.getUsers = async (req, res) => {
    db.connectDB();
    await Usuario.find({}, { orders: 0, registered: 0 })
        .then(data => {
            res.status(200).json(data);
        })
        .catch((error) => {
            res.status(500).json(error);
        })
        .finally(() => {
            db.disconnectDB();
        })
};

exports.getUser = async (req, res) => {
    db.connectDB();
    await Usuario.findOne(
        {
            _id: req.params.idUser
        })
        .then((data) => {
            if (data) {
                return res.status(200).json(data);
            }
            res.status(400).json("El usuario buscado no existe");
        })
        .catch((error) => {
            res.status(500).json(error);
        })
        .finally(() => {
            db.disconnectDB();
        })
};

exports.deleteUser = async (req, res) => {
    db.connectDB();
    await Usuario.findOneAndRemove(
        {
            _id: req.params.idUser
        },
    )
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => {
            res.status(500).json(error);
        })
        .finally(() => {
            db.disconnectDB();
        })
}

exports.updateUser = async (req, res) => {
    db.connectDB();
    await Usuario.findOneAndUpdate(
        {
            _id: req.body._id
        },
        req.body
    )
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => {
            res.status(500).json(error);
        })
        .finally(() => {
            db.disconnectDB();
        })
};


//-------------------------ORDERS-------------------------//
exports.addOrder = async (req, res) => {
    db.connectDB();   
    let productsSelecteds =[];
    let local = await Local.findOne(
        { _id : req.body.local._id
            
        } ,
        {
            products:1  
        }
    ); 
    console.log(local);
    
    //GUARDA SOLAMENTE EL ULTIMO ELEMENTO ENVIADO 
    // let order = new Order();
    // order.local = local;
    // await Usuario.findOneAndUpdate(
    //     {
    //         _id: req.params.idUser
    //     },
    //     {
    //         $addToSet: { orders: order }
    //     },
    //     {
    //         new: true
    //     }
    // )
    //     .then((data) => {
    //         if (data) {
    //             return res.status(200).json(data);
    //         }
    //         res.status(400).json("El usuario buscado no existe");
    //     })
    //     .catch((error) => {
    //         res.status(500).json(error);
    //     })
    //     .finally(() => {
    //         db.disconnectDB();
    //     })
}

exports.getOrders = async (req, res) => {
    db.connectDB();
    await Usuario.findOne(
        {
            _id: req.params.idUser,
        },
        {
            _id: 1,
            name: 1,
            orders: 1
        }
    )
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => {
            res.status(500).json(error);
        })
        .finally(() => {
            db.disconnectDB();
        })
}

exports.getOrder = async (req, res) => {
    db.connectDB();
    await Usuario.findOne(
        {
            _id: req.params.idUser,
            orders: {
                $elemMatch: {
                    _id: mongoose.Types.ObjectId(req.query.idOrder)
                },
            }
        },
        {
            _id: 1,
            name: 1,
            "orders.$": 1,
        }
    )
        .then(data => {
            res.status(200).json(data);
        })
        .catch((error) => {
            res.send(500).json(error);
        })
        .finally(() => {
            db.disconnectDB();
        })
}

exports.updateOrder = async (req, res) => {
    // db.connectDB();
    // await Usuario.findOneAndUpdate(
    //     {
    //         _id: req.params.idUser,
    //         orders: {
    //             $elemMatch: { _id: mongoose.Types.ObjectId(req.body.idOrder) }
    //         },
    //     },
    //     {
    //         $set:
    //         {
    //             "orders.$.name": req.body.name,
    //             "orders.$.description": req.body.description,
    //             "orders.$.category": req.body.category,
    //             "orders.$.price": req.body.price,
    //         }
    //     },
    //     { new: true }
    // )
    //     .then((data) => {
    //         res.status(200).json(data);
    //     })
    //     .catch((error) => {
    //         res.status(500).json(error);
    //     })
    //     .finally(() => {
    //         db.disconnectDB();
    //     })
}

exports.deleteOrder = async (req, res) => {
    db.connectDB();
    await Usuario.findOneAndUpdate(
        {
            _id: req.params.idUser,
            orders : {
                $elemMatch: { _id: mongoose.Types.ObjectId(req.body.idOrder) }
            },
        },
        {
            $pull: {
                orders: { _id: mongoose.Types.ObjectId(req.body.idOrder) }
            }
        }
    )
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((error) => {
            res.status(500).json(error);
        })
        .finally(() => {
            db.disconnectDB();
        })
}

// exports.login = async (req, res) => {
//     db.connectDB();
//     Usuario.findOne({
//         userName: req.body.userName,
//         password: req.body.password
//     })
//     .then( (user) =>{
//         if(user){
//             return res.status(200).json("Usuario logeado con exito");
//         }
//         return res.status(401).send("El usuario y/o contraseña ingresados no son correctos");
//     })
//     .catch(error =>{
//         console.log(error);
//         res.status(401).send("Error al realizar el login");
//     })
//     .finally(() =>{
//         db.disconnectDB();
//     });
// };


