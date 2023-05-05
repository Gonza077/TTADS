const db = require('./DB');
const Local = require('../Schema/localSchema');
const mongoose = require('mongoose');
var Product = require('../Schema/productSchema');

//------------------------------LOCALES------------------------------//
exports.addLocal = async (req, res) => {
    db.connectDB();
    await Local.create(req.body)
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((error) => {
            res.status(500).json(error);
        })
        .finally(() => {
            db.disconnectDB();
        })
};

exports.getLocals = async (req, res) => {
    db.connectDB();
    await Local.getAllLocals()
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((error) => {
            res.status(500).json(error);
        })
        .finally(() => {
            db.disconnectDB()
        });
};

exports.getLocal = async (req, res) => {
    db.connectDB();
    let idLocal = null;
    let nameLocal = null;
    if (req.query.idLocal) {
        idLocal = req.query.idLocal;
    }
    if (req.query.nameLocal) {
        nameLocal = req.query.nameLocal;
    } 
    await Local.getLocal(idLocal,nameLocal)
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

exports.updateLocal = async (req, res) => {
    db.connectDB();
    await Local.updateLocal(req.body)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch(() => {
            res.status(500).json(error);
        })
        .finally(() => {
            db.disconnectDB();
        })
};

exports.deleteLocal = async (req, res) => {
    db.connectDB();
    await Local.deleteLocal(req.params.idLocal)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => {
            res.status(500).json(error);
        })
        .finally(() => {
            db.disconnectDB();
        });
}
//------------------------------LOCALES------------------------------//

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
            _id: 1,
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

//------------------------------DESUSO------------------------------//
// exports.getLocal = async (req, res) => {
//     db.connectDB();
//     Local.findOne({
//         _id: req.params.idLocal
//     })
//         .then((local) => {
//             res.send(local);
//         })
//         .catch((error) => {
//             res.status(500).json(error);
//         })
//         .finally(() => {
//             db.disconnectDB();
//         })
// };

// exports.getLocalByName = async (req, res) => {
//     db.connectDB();
//     await Local.find(
//         { name: req.params.nameLocal },
//     )
//         .then((locales) => {
//             res.json(locales);
//         })
//         .catch((error) => {
//             console.error(error);
//             res.status(500).send('Hubo un error');
//         })
//         .finally(() => {
//             db.disconnectDB();
//         })
// };

// exports.getProduct = async (req, res) => {
//     db.connectDB();
//     await Local.findOne(
//         {
//             _id: req.body.idLocal,
//             products: { $elemMatch: { _id: mongoose.Types.ObjectId(req.body.idProduct) } },
//         },
//         {
//             _id: 1,
//             name: 1,
//             "products.$": 1,
//         }
//     )
//         .then(data => {
//             res.status(200).json(data);
//         })
//         .catch((error) => {
//             res.send(500).json(error);
//         })
//         .finally(() => {
//             db.disconnectDB();
//         })
// }

// exports.getProductByName = async (req, res) => {
//     db.connectDB();
//     await Local.find(
//         {
//             _id: req.body.idLocal,
//             products: { $elemMatch: { name: req.body.nameProduct } },
//         },
//         {
//             _id: 1,
//             name: 1,
//             "products.$": 1,
//         })
//         .then(data => {
//             res.status(200).json(data);
//         })
//         .catch((error) => {
//             res.send(500).json(error);
//         })
//         .finally(() => {
//             db.disconnectDB();
//         })
// }



