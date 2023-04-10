var mongoose = require('mongoose');
var Producto = require('./productoSchema');

var LocalSchema = new mongoose.Schema({
    nombre: { type: String, unique: true },
    descripcion: { type: String },
    costoEnvio: { type: Number },
    tiempoEnvio: { type: String },
    productos: { type: [] },
    direccion: { type: String },
    tags: { type: [String] },
    imagePath: { type: String, default: '/uploads/'},
});

var Local = mongoose.model('Local', LocalSchema);
module.exports = Local;