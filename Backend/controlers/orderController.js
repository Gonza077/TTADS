const mongoose = require('mongoose');
const db = require('./DB');
const Usuario = require('../Schema/userSchema');
const Order = require("../Schema/orderSchema");
const Local = require('../Schema/localSchema');

exports.addOrder = async (req, res) => {
    db.connectDB();   
    //FALTA VALIDAR EL LOCAL Y LOS PRODUCTOS INGRESADOS
    let products=[];
    let productSelected = await Local.findOne(
        {
            _id: req.body.local._id,
            products: {
                $elemMatch: { _id: mongoose.Types.ObjectId(req.body.local.products._id) }
            }
        },
        {   
            _id:1,
            "products.$": 1,
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
    console.log(productSelected);
    // let order = new Order(req.body);
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