var mongoose = require('mongoose');
var Orders = require("./orderSchema");

var UsuarioSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    password: { type: String, default: null },
    gender: { type: String, default: "N/A" },
    name: { type: String, default: null },
    email: { type: String, default: null },
    phone: { type: String, default: null },
    address: { type: String, },
    registered: { type: String, default: Date.now },
    age: { type: Number, default: null },
    isActive: { type: Boolean, default: false },
    orders: [Orders.schema],
});

var Usuario = mongoose.model('users', UsuarioSchema);
module.exports = Usuario;