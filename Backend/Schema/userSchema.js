var mongoose = require('mongoose');
Schema = mongoose.Schema;

var UsuarioSchema = new mongoose.Schema({
    userName: { type: String, required: true},
    password: { type: String, default: null },
    gender: { type: String, default: "N/A" },
    name: { type: String, default: null },
    email: { type: String, default: null },
    phone: { type: String, default: null },
    address: { type: String, },
    registered: { type: Date, default: Date.now },
    age: { type: Number, default: null },
    isActive: { type: Boolean, default: false },

    // userName: { type: String, required: true, unique: true },
    // password: { type: String, default: null },
    // gender: { type: String, default: "N/A" },
    // name: { type: String, default: null },
    // email: { type: String, required: true, },
    // phone: { type: String, required: true, },
    // address: { type: String, required: true, },
    // registered: { type: Date, default: Date.now },
    // age: { type: Number,default: null },
    // isActive: { type: Boolean, default: false },


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