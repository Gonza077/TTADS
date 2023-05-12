const db = require('./DB');
const mongoose = require('mongoose');
const Local = require('../Schema/localSchema');
const Product = require('../Schema/productSchema');

exports.addLocal = async (req, res) => {
    db.connectDB();
    //delete req.body.products;
    let local = new Local(req.body);
    let products = [];
    if (req.body.products) {
        req.body.products.forEach(async prod => {
            let product = new Product(prod);
            product.local = local._id;
            product.save();
            products.push(product._id);
        });
        local.products = products;
    }
    local.save()
        .then((local) => {
            res.status(200).json(local);
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
    await Local.find({})
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
    await Local.findOne(
        {
            $or: [
                { _id: idLocal },
                { name: nameLocal }
            ]
        },
        {
            products: 1, _id: 1, name: 1 , address:1
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

exports.updateLocal = async (req, res) => {
    db.connectDB();
    await Local.findOneAndUpdate({
        _id: req.body._id
    },
        req.body,
        {
            new: true
        })
        .select("name address email phone isActive")
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
    await Product.deleteMany({ local: req.params.idLocal });
    await Local.findOneAndRemove({ _id: req.params.idLocal })
        .then((data) => {
            if (data) res.status(200).json({message:"Local eliminado",data});
            res.status(200).json("No existe el local ingresado");
        })
        .catch((error) => {
            res.status(500).json(error);
        })
        .finally(() => {
            db.disconnectDB();
        });
}





