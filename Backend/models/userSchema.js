var mongoose = require('mongoose');
Schema = mongoose.Schema;

var UsuarioSchema = new mongoose.Schema({
    usuario: String | undefined,
    fechaCreacion: { type: Date, default: Date.now },
    contrasena: String,
    nombreApellido: String | undefined,
    direccion: String | undefined,
    telefono: String,
    email: String | undefined,
    pedidos: { type : [Object]}
});

var Usuario = mongoose.model('usuario', UsuarioSchema);
module.exports = Usuario;