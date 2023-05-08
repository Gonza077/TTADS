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
    let nameProduct=null;
    let idProduct = null;
    //Casteo de valores nulos o faltantes
    if (req.body.nameProduct) {
        nameProduct= req.body.nameProduct;
    }
    if (req.body.idProduct) {
        idProduct =  req.body.idProduct;
    }
    await Local.getProduct(req.params.idLocal, nameProduct,idProduct)
    // await Local.findOne(
    //     {
    //         _id: mongoose.Types.ObjectId(req.params.idLocal),
    //         products: {
    //             $elemMatch: {
    //                 $or: [
    //                     { _id: mongoose.Types.ObjectId(idProduct) },
    //                     { name: nameProduct }
    //                 ]
    //             }
    //         },
    //     },
    //     {   
    //         _id:0,
    //         "products.$": 1,
    //     }
    // )
        .then(data => {
            res.status(200).json(data);
        })
        .catch((error) => {
            res.status(500).json(error);
        })
        .finally(() => {
            db.disconnectDB();
        })
}

exports.addProduct = async (req, res) => {
    db.connectDB();
    let product = new Product(req.body);
    //Valida la creacion del producto
    if (product.validateSync()){
        return res.status(500).json(product.validateSync());
    } 
    await Local.findOneAndUpdate(
        {
            _id: req.params.idLocal,
        },
        {
            $addToSet: { products: product }
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