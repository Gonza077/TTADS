const mongoose = require('mongoose');
const db = require('./DB');
const Usuario = require('../Schema/userSchema');
const Order = require("../Schema/orderSchema");
const Local = require('../Schema/localSchema');

exports.addOrder = async (req, res) => {
    db.connectDB();   
    let order = new Order();        
    //Se busca el local con el ID ingresado
    let local = await Local.findOne(
        {
            _id: mongoose.Types.ObjectId(req.body.local._id),
        },
        {   
            _id:1,
            products: 1,
        }
    )
        .then((data) => {      
            //Para obtener la data de la BD
            return data;
        })
        .catch((error) => {
            res.status(500).json(error);
        })
    //Se valida que exista el local ingresado
    if (local){
        //Se asigna el id del local
        order.local._id = local._id;
        //Por cada producto del local ingresado se valida que el ID que se manda por el body exista 
        //si no, se desprecia
        local.products.forEach( localProd => {
            req.body.local.products.forEach(
                orderProduct => {
                    if (localProd._id == orderProduct._id){
                        order.local.products.push(localProd);
                    }
                }                  
            )
        })
        //Se calcula el precio de la orden y se asigna al usuario
        order.calculatePriceOrder();
        await Usuario.findOneAndUpdate(
            {
                _id: req.params.idUser
            },
            {
                $addToSet: { orders: order }
            },
            {
                
                orders:1
            }
        )
            .then((data) => {
                if (data) {
                    return res.status(200).json(data);
                }
            })
            .catch((error) => {
                res.status(500).json(error);
            })
            .finally(() => {
                db.disconnectDB();
            })
    }
}

exports.getOrders = async (req, res) => {
    db.connectDB();
    await Usuario.findOne(
        {
            _id: req.params.idUser,
        },
        {
            name: 1,
            _id: 1,
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