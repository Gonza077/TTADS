const db = require('./DB');
const Local = require('../Schema/localSchema');
const mongoose = require('mongoose');
const Product = require('../Schema/productSchema');

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





