const mongoose = require('mongoose');
const db = require('./DB');
const Usuario = require('../Schema/userSchema');
const Order = require("../Schema/orderSchema");
const Local = require('../Schema/localSchema');

exports.addOrder = async (req, res) => {
    db.connectDB();          
    //Se busca el local con el ID ingresado
    let local = await Local.findOne({ 
            _id: req.body.localID 
        },
        {
            products: 1, _id: 1, name: 1 , address:1
        })
        .then((data) => {      
            //Para obtener la data de la BD
            return data;
        })
        .catch((error) => {
            res.status(500).json(error);
        })
    //TODO ESTO ESTA ASI NOMAS, HABRIA QUE PULIRLO Y VER SI SE CREAN METODOS DE INSTANCIA
    if (local){
        //Hay que filtrar los productos seleccionados
        //------ATADO CON ALAMBRE-----//

        if (local.products.length > 0 ){   
            let products = []
            local.products.forEach( localProd => {
                req.body.products.forEach(
                    orderProduct => {
                        if (localProd._id == orderProduct._id){
                            products.push(localProd);
                        }
                    }                  
                )
            })  
            local.products = products
        //------ATADO CON ALAMBRE-----//

            let order = new Order();
            order.setLocal(local);
            //Se calcula el precio de la orden y se asigna al usuario
            order.calculatePriceOrder();
            if(order.validateSync()){
                return res.status(500).json(order.validateSync());
            }
            await Usuario.findOneAndUpdate(
                {
                    _id: req.params.idUser
                },
                {
                    $addToSet: { orders: order }
                },
                { 
                    new: true
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

        }else{
            res.status(500).json("Local no tiene productos");
        }
    } else{
        res.status(500).json("Local inexistente");
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
            _id: req.params.idUser
        },
        {
            $pull: {
                orders: { _id: mongoose.Types.ObjectId(req.body.idOrder) }
            }
        },
        {
            new:true,
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