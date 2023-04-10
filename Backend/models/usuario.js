var mongoose = require('mongoose');
Schema = mongoose.Schema;

var UsuarioSchema = new mongoose.Schema({
    usuario: { type: String },
    fechaCreacion: { type: Date, default: Date.now },
    contrasena: { type: String },
    nombreApellido: { type: String },
    direccion: { type: String },
    telefono: { type: String },
    email: { type: String },
     pedidos: { type : [Object]}
});

var Usuario = mongoose.model('usuario', UsuarioSchema);
module.exports = Usuario;