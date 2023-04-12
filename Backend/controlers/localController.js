const Local = require('../Schema/localSchema');
const Producto = require('../Schema/productoSchema');
const db = require('./DB');

exports.addLocal = async (req, res) => {
    db.connectDB();
    new Local(req.body).save()
        .then((local) =>{ 
            //local.imagePath += req.file.filename;
            res.send(local);
        })
        .catch((error) =>{
            console.error(error);
            res.status(500).send('Hubo un erroral agregar el local');
        })
        .finally(() =>{
            db.disconnectDB();
        })
};

exports.listLocal = async (req, res) => {
    db.connectDB();
    Local.find()
        .then((locales) =>{       
            res.send(locales)
        })
        .catch((error)=>{
            console.error(error);
            res.status(500).send('Hubo un error al recuperar los locales');     
        })
        .finally(()=>{
            db.disconnectDB()
        });
};

exports.nameLocal = async (req, res) => {
    db.connectDB();
    Local.findOne({ _id: req.params.id }, 'nombre')
        .then((local) =>{
            res.send(local.nombre);
        })
        .catch((error)=>{
            console.error(error);
            res.status(500).send('Hubo un error al buscar el nombre del local');
        })
        .finally(() =>{
            db.disconnectDB();
        })
};

exports.updateLocal = async (req, res) => {
    db.connectDB();
    Local.findOneAndUpdate(
        { _id: req.body._id }, 
        req.body, 
        { new: true }
    )
        .then(() =>{
            res.status(200).send("Local actualizado con exito");
        })
        .catch(() =>{
            console.error(error);
            res.status(500).send('Hubo un error');
        })
        .finally(() =>{
            db.disconnectDB();
        })/*
    try {
        const { nombre, descripcion, costoEnvio, tiempoEnvio, tags } = req.body;
        let local = await Local.findById(req.body._id);
        if (!local) {
            res.status(404).json({ msg: 'No existe el local' });
        }
        const imagePath = '/uploads/' + req.file.filename;
        local.imagePath = imagePath
        local.nombre = nombre
        local.descripcion = descripcion
        local.costoEnvio = costoEnvio
        local.tiempoEnvio = tiempoEnvio
        local.tags = tags
        await Local.findOneAndUpdate({ _id: local.id }, local, { new: true })
            .then(res.status(200).json("Local Editado"))
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }*/
};

exports.deleteLocal = async (req, res) => {
    db.connectDB();
    Local.findOneAndRemove(
        { _id: req.params.id }
    )
        .then(() =>{
            res.status(200).json("Se elimino al local correctamente");
        })
        .catch((error) =>{
            console.error(error);
            res.status(500).send('Hubo un error al eliminar el local seleccionado');
        })
        .finally(() =>{
            db.disconnectDB();
        });  
}

exports.selectLocal = async (req, res) => {
    if (req.params.id === "favicon.ico") {
        return ;
    }
    db.connectDB();
    //POR DEFECTO CUANDO SE ENTRA A RUTA LOCAL BUSCA ESTE PARAMETRO, 
    //FAVICON.ICO SI NO SE LLENA DEE ERRORES LA PANTALLA
    Local.findById(
        {_id:req.params.id}
    )
        .then(() =>{

        })
        .catch((error) =>{
            console.error(error);
            res.status(500).send('Hubo un error al seleccionar el local');
        })
        .finally(() =>{
            db.disconnectDB();
        })
    /*
    try {
        let local = await Local.findById(req.params.id);
        if (!local) {
            res.status(404).json({ msg: 'No existe el local' });
        }
        res.json(local);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }*/
};

exports.addProducto = async (req, res) => {
    db.connectDB();
    await Local.findById({
        _id: req.params.id,
    })
        .then((local) =>{
            let producto=new Producto(req.body)
            //FALTA ESTO DE LA IMAGEN
            //const imagePath = '/uploads/' + req.file.filename;
            //producto.imagePath = imagePath;
            local.productos.push( producto );
            Local.findByIdAndUpdate(
                { _id: local._id }, 
                local
            )
                .then((local)=>{
                    res.status(200).send(local);
                })
                .finally(() =>{
                    db.disconnectDB();
                }) 
        })
        .catch((error) =>{
            console.log(error);
            res.status(500).send('Hubo un error al agregar el producto');
        });
    /*
    try {
        let local = await Local.findById(req.params.id);
        if (!local) {
            res.status(404).json({ msg: 'No existe el local' });
        }
        const { nombre, descripcion, categoria, subcategoria, precio } = req.body;
        let producto = {}
        //const imagePath = '/uploads/' + req.file.filename;
        //producto.imagePath = imagePath;
        producto.nombre = nombre;
        producto.descripcion = descripcion;
        producto.categoria = categoria;
        producto.subcategoria = subcategoria;
        producto.precio = precio;
        local.productos.push(producto);
        local = await Local.findByIdAndUpdate({ _id: req.params.id }, local);
        console.log(local.productos);
        res.send(local)
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }*/
};

exports.deleteProducto = async (req, res) => {
    db.connectDB();
    await Local.findById({
        _id : req.params.idLoc
    })
        .then((local) =>{
            //ESTO HABRIA QUE HACERLO CON EL ID ME PARECE
            local.productos=local.productos.filter(prod => prod.nombre!=req.params.nomProd);
            Local.findByIdAndUpdate(
                { _id: local._id }, 
                local,
                { new: true }
            )
                .then((local)=>{
                    res.status(200).send(local);
                })
                .finally(() =>{
                    db.disconnectDB();
                }) 
        })
        .catch((error) =>{
            console.log(error);
            res.status(500).send('Hubo un error al actualizar el producto');
        })
        /*
    try {
        let local = await Local.findById(req.params.idLoc);
        if (!local) {
            res.status(404).json({ msg: 'No existe el local' });
        };
        var producto = local.productos.find(obj => {
            return obj.nombre == req.params.nomProd
        })
        if (!producto) {
            res.status(404).json({ msg: 'No existe el producto' });
        }
        var indice = local.productos.indexOf(producto);
        local.productos.splice(indice, 1);
        unlink(path.resolve('./public' + producto.imagePath));
        await Local.findOneAndUpdate({ _id: req.params.idLoc }, local, { new: true })
            .then(res.status(200).json("Eliminado"))
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }*/
};

exports.listProducto = async (req, res) => {
    db.connectDB();
    await Local.findById({
        _id: req.params.id
    })
        .then((local) =>{
            
            res.send(local.productos);
        })
        .catch((error) =>{
            console.error(error);
            res.status(500).send('Hubo un error al recuperar los productos');
        })
        .finally(() =>{
            db.disconnectDB();
        })
    /*
    try {
        let local = await Local.findById(req.params.id);
        if (!local) {
            res.status(404).json({ msg: 'No existe el local' });
        };
        let productos = local.productos
        res.send(productos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al recuperar los productos');
    }*/
};

exports.obtenerProducto = async (req, res) => {
    db.connectDB();
    await Local.findById({
        _id :req.params.idLoc
    })
        .then((local) =>{
            res.json(local.productos.find(prod => prod._id== req.params.idPro))
        })
        .catch((error) =>{
            console.error(error);
            res.status(500).send('Hubo un error al obtener el producto');
        })
        .finally(() =>{
            db.disconnectDB();
        })
        /*
    try {
        let local = await Local.findById(req.params.idLoc);
        if (!local) {
            res.status(404).json({ msg: 'No existe el local' });
        };
        var producto = local.productos.find(obj => {
            return obj._id == req.params.idPro
        })
        res.json(producto);
        console.log('Ok');
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }*/
};

exports.editProducto = async (req, res) => {
    db.connectDB();
    await Local.findById({
        _id: req.params.idLoc,
    })
        .then((local) =>{
            //FALTA ESTO DE LA IMAGEN
            let newProduct= new Producto(req.body);
            //newProduct.imagePath+= req.file.filename
            //const imagePath = '/uploads/' + req.file.filename;
            //producto.imagePath = imagePath;
            //ESTO DEBERIA SER CON EL ID
            local.productos = local.productos.filter(prod => prod.nombre != req.params.nomProd)
            local.productos.push(newProduct);
            Local.findByIdAndUpdate(
                { _id: local._id }, 
                local
            )
                .then((local)=>{
                    res.status(200).send(local);
                })
                .finally(() =>{
                    db.disconnectDB();
                })
        })
        .catch((error) =>{
            console.log(error);
            res.status(500).send('Hubo un error al agregar el producto');
        })
    /*
    try {
        const { nombre, descripcion, categoria, subcategoria, precio } = req.body;
        let local = await Local.findById(req.params.idLoc);
        console.log(req.params.idLoc);
        if (!local) {
            res.status(404).json({ msg: 'No existe el local' });
        };
        var producto = local.productos.find(obj => {
            return obj.nombre == req.params.nomProd
        })
        if (!producto) {
            res.status(404).json({ msg: 'No existe el producto' });
        }
        const imagePath = '/uploads/' + req.file.filename;
        producto.imagePath = imagePath;
        producto.nombre = nombre;
        producto.descripcion = descripcion;
        producto.categoria = categoria;
        producto.subcategoria = subcategoria;
        producto.precio = precio;
        await Local.findOneAndUpdate({ _id: req.params.idLoc }, local, { new: true })
            .then(res.status(200).json("Editado"))
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }*/
};

exports.findLocalesByName = async (req, res) => {
    db.connectDB();
    await Local.find({ nombre: { $regex: req.params.name, $options: 'i' } })
        .then((locales) =>{
            res.json(locales);
        })
        .catch((error) =>{
            console.error(error);
            res.status(500).send('Hubo un error');
        })
        .finally(() =>{
            db.disconnectDB();
        })
        
    /*
    try {
        let nom = req.params.name;
        let locales = await Local.find({ nombre: { $regex: nom, $options: 'i' } });
        res.json(locales);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }*/
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