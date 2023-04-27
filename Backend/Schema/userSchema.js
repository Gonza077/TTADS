var mongoose = require('mongoose');
Schema = mongoose.Schema;

var UsuarioSchema = new mongoose.Schema({
    userName: { type: String | undefined },
    password: { type: String | undefined },
    gender: { type: String | undefined },
    name: { type: String | undefined },
    email: { type: String | undefined },
    phone: { type: String | undefined },
    address: { type: String | undefined },
    registered: { type: Date, default: Date.now },
    age: { type: Number | undefined },
    isActive: { type: Boolean | undefined },
    //NO IMPLEMENTADO
    // orders: {
    //     date: { type: Date, default: Date.now },
    //     //ACA DEBERIAN IR LOS PRODUCTOS DEL LOCAL SELECCIONADO SOLAMENTE
    //     local: { type: Object },
    //     price: { type: Number | undefined },
    // }
});

var Usuario = mongoose.model('users', UsuarioSchema);
module.exports = Usuario;