const db = require('./DB');
const mongoose = require('mongoose');
const Local = require('../Schema/localSchema');
const Product = require('../Schema/productSchema');

//------------------------------PRODUCTOS------------------------------//
exports.getProducts = async (req, res) => {
    db.connectDB();
    await Local.findOne(
        {
            _id: req.params.idLocal
        },
        {
            _id: 1,
            name: 1,
            products: 1
        }
    )
        .then(data => {
            res.status(200).json(data)
        })
        .catch((error) => {
            res.status(500).json(error);
        })
        .finally(() => {
            db.disconnectDB();
        })
}

exports.getProduct = async (req, res) => {
    db.connectDB();
    //Casteo de valores nulos o faltantes
    if (!req.query.nameProduct) {
        req.query.nameProduct = null
    }
    if (!req.query.idProduct) {
        req.query.idProduct = null
    }
    await Local.findOne(
        {
            _id: req.query.idLocal,
            products: {
                $elemMatch: {
                    $or: [
                        { _id: mongoose.Types.ObjectId(req.query.idProduct) },
                        { name: req.query.nameProduct }
                    ]
                }
            },
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
}

exports.addProduct = async (req, res) => {
    db.connectDB();
    console.log(req.body);
    await Local.findOneAndUpdate(
        {
            _id: req.params.idLocal,
        },
        {
            $addToSet: { products: new Product(req.body) }
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
};

exports.deleteProduct = async (req, res) => {
    db.connectDB();
    await Local.findOneAndUpdate(
        {
            _id: req.body.idLocal,
            products: {
                $elemMatch: { _id: mongoose.Types.ObjectId(req.body.idProduct) }
            },
        },
        {
            $pull: {
                products: { _id: mongoose.Types.ObjectId(req.body.idProduct) }
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

exports.editProduct = async (req, res) => {
    db.connectDB();
    await Local.findOneAndUpdate(
        {
            _id: req.body.idLocal,
            products: {
                $elemMatch: { _id: mongoose.Types.ObjectId(req.body.idProduct) }
            },
        },
        {
            $set:
            {
                "products.$.name": req.body.name,
                "products.$.description": req.body.description,
                "products.$.category": req.body.category,
                "products.$.price": req.body.price,
            }
        },
        { new: true }
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