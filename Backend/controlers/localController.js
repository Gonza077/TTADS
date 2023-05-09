const db = require('./DB');
const Local = require('../Schema/localSchema');

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





