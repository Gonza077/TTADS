var mongoose = require('mongoose');
Schema = mongoose.Schema;

var UsuarioSchema = new mongoose.Schema({
    usuario: { type: String | undefined },
    fechaCreacion: { type: Date, default: Date.now },
    contrasena: { type: String },
    nombreApellido: { type: String | undefined },
    direccion: { type: String | undefined },
    telefono: { type: String },
    email: { type: String | undefined },
    pedidos: {}
});

var Usuario = mongoose.model('users', UsuarioSchema);
module.exports = Usuario;