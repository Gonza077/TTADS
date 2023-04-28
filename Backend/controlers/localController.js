const db = require('./DB');
const Local = require('../Schema/localSchema');
const mongoose = require('mongoose');
var productSchema = require('../Schema/productSchema');

//------------------------------LOCALES------------------------------//
exports.addLocal = async (req, res) => {
    db.connectDB();
    new Local(req.body).save()
        .then((local) => {
            res.send(local);
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
    Local.find()
        .then((locales) => {
            res.send(locales)
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Hubo un error al recuperar los locales');
        })
        .finally(() => {
            db.disconnectDB()
        });
};

exports.getLocal = async (req, res) => {
    db.connectDB();
    Local.findOne({
        _id: req.params.idLocal
    })
        .then((local) => {
            res.send(local);
        })
        .catch((error) => {
            res.status(500).json(error);
        })
        .finally(() => {
            db.disconnectDB();
        })
};

exports.getLocalByName = async (req, res) => {
    db.connectDB();
    await Local.find(
        { name: req.params.nameLocal },
    )
        .then((locales) => {
            res.json(locales);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Hubo un error');
        })
        .finally(() => {
            db.disconnectDB();
        })
};

exports.updateLocal = async (req, res) => {
    db.connectDB();
    Local.findOneAndUpdate(
        { _id: req.body._id },
        req.body,
        { new:true }
    )
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
    await Local.findOneAndRemove({
        _id: req.params.idLocal
    })
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
    Local.findOne(
        { _id : req.params.idLocal}, 
        { products:1 ,_id:0}      
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
    await Local.find(
        {
            products: { $elemMatch: { _id : req.params.idProduct}}, 
        },    
        {   
            _id:1,
            name:1,
            "products.$":1,
        }
    )
    .then(data =>{
        res.status(200).json(data);
    })
    .catch((error) => {
        res.send(500).json(error);
    })
    .finally(() => {
        db.disconnectDB();
    })
}

exports.getProductByName = async (req, res) => {
    db.connectDB();
    await Local.find(
    {
        products: {$elemMatch: { name : req.params.nameProduct }},    
    },
    {   
        _id:1,
        name:1,
        "products.$":1,
    })
    .then( data =>{
        res.status(200).json(data);
    })
    .catch((error) => {
        res.send(500).json(error);
    })
    .finally(() => {
        db.disconnectDB();
    })
}

exports.addProducto = async (req, res) => {
    db.connectDB();
    Local.updateOne(
    {
        _id: req.params.idLocal,
    },
    {
        $addToSet: { products: new productSchema(req.body)}
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

    // await Local.find({
    //     _id: req.params.id,
    // }) 
    //     .then((local) => {
    //         local.productos.push(req.body);
    //         Local.findByIdAndUpdate(
    //             { _id: local._id },
    //             local
    //         )
    //             .then((local) => {
    //                 res.status(200).json(local);
    //             })
    //             .finally(() => {
    //                 db.disconnectDB();
    //             })
    //     })
    //     .catch((error) => {
    //         res.status(500).json(error);
    //     });
};

//-----------------------FALTA PROBAR TODO ESTO-------------------------//

exports.deleteProducto = async (req, res) => {
    db.connectDB();
    await Local.findById({
        _id: req.params.idLoc
    })
        .then((local) => {
            //ESTO HABRIA QUE HACERLO CON EL ID ME PARECE
            local.productos = local.productos.filter(prod => prod.nombre != req.params.nomProd);
            Local.findByIdAndUpdate(
                { _id: local._id },
                local,
                { new: true }
            )
                .then((local) => {
                    res.status(200).send(local);
                })
                .finally(() => {
                    db.disconnectDB();
                })
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send('Hubo un error al actualizar el producto');
        })
};

exports.editProducto = async (req, res) => {
    db.connectDB();
    await Local.findById({
        _id: req.params.idLoc,
    })
        .then((local) => {
            local.productos = local.productos.filter(prod => prod.nombre != req.params.nomProd)
            local.productos.push(req.body);
            Local.findByIdAndUpdate(
                { _id: local._id },
                local
            )
                .then((local) => {
                    res.status(200).send(local);
                })
                .finally(() => {
                    db.disconnectDB();
                })
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send('Hubo un error al agregar el producto');
        })
};


