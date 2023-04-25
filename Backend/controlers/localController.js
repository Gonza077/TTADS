const db = require('./DB');
const Local = require('../Schema/localSchema');
const Producto = require('../Schema/productoSchema');

exports.addLocal = async (req, res) => {
    db.connectDB();
    new Local(req.body).save()
        .then((local) => {
            //local.imagePath += req.file.filename;
            res.send(local);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Hubo un erroral agregar el local');
        })
        .finally(() => {
            db.disconnectDB();
        })
};

exports.listLocal = async (req, res) => {
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
        .catch(() => {
            res.status(500).send('Hubo un error al buscar el nombre del local');
        })
        .finally(() => {
            db.disconnectDB();
        })
};

exports.updateLocal = async (req, res) => {
    db.connectDB();
    Local.findOneAndUpdate(
        { _id: req.body.id },
        req.body,
        { new: true }
    )
        .then(() => {
            res.status(200).json("Local actualizado con exito");
        })
        .catch(() => {
            console.error(error);
            res.status(500).send('Hubo un error');
        })
        .finally(() => {
            db.disconnectDB();
        })
};

exports.deleteLocal = async (req, res) => {
    db.connectDB();
    Local.findOneAndRemove({
        _id: req.params.id
    })
        .then(() => {
            res.status(200).json("Se elimino al local correctamente");
        })
        .catch(() => {
            res.status(500).send('Hubo un error al eliminar el local seleccionado');
        })
        .finally(() => {
            db.disconnectDB();
        });
}



//-----------------------FALTA PROBAR TODO ESTO-------------------------//
exports.selectLocal = async (req, res) => {
    db.connectDB();
    Local.findById(
        { _id: req.params.id }
    )
        .then((local) => {
            res.send(local);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Hubo un error al seleccionar el local');
        })
        .finally(() => {
            db.disconnectDB();
        })
};

exports.addProducto = async (req, res) => {
    db.connectDB();
    await Local.findById({
        _id: req.params.id,
    })
        .then((local) => {
            let producto = new Producto(req.body)
            //FALTA ESTO DE LA IMAGEN
            //const imagePath = '/uploads/' + req.file.filename;
            //producto.imagePath = imagePath;
            local.productos.push(producto);
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
        });
};

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

exports.listProducto = async (req, res) => {
    db.connectDB();
    await Local.findById({
        _id: req.params.id
    })
        .then((local) => {

            res.send(local.productos);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Hubo un error al recuperar los productos');
        })
        .finally(() => {
            db.disconnectDB();
        })
};

exports.obtenerProducto = async (req, res) => {
    db.connectDB();
    await Local.findById({
        _id: req.params.idLoc
    })
        .then((local) => {
            res.json(local.productos.find(prod => prod._id == req.params.idPro))
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Hubo un error al obtener el producto');
        })
        .finally(() => {
            db.disconnectDB();
        })
};

exports.editProducto = async (req, res) => {
    db.connectDB();
    await Local.findById({
        _id: req.params.idLoc,
    })
        .then((local) => {
            let newProduct = new Producto(req.body)
            local.productos = local.productos.filter(prod => prod.nombre != req.params.nomProd)
            local.productos.push(newProduct);
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

exports.findLocalesByName = async (req, res) => {
    db.connectDB();
    await Local.find({ name: { $regex: req.params.name, $options: 'i' } })
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

exports.findProductosByName = async (req, res) => {
    try {
        let local = await Local.findById(req.params.id);
        if (!local) {
            res.status(404).json({ msg: 'No existe el local' });
        };
        const filter = new RegExp(req.params.name, 'i');
        let productos = local.productos.filter(({ nombre }) =>
            nombre.match(filter)
        );
        //console.log(productos);
        res.send(productos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};