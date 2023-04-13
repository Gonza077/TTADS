var mongoose = require('mongoose');

var LocalSchema = new mongoose.Schema({
    nombre: { type: String, unique: true },
    descripcion: { type: String },
    costoEnvio: { type: Number },
    tiempoEnvio: { type: String },
    productos: {},
    direccion: { type: String },
    tags: { type: String },
    imagePath: { type: String, default: '/uploads/' },
});

var Local = mongoose.model('locals', LocalSchema);
module.exports = Local;