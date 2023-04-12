var mongoose = require('mongoose');

var ProductoSchema = new mongoose.Schema({
  nombre: { type: String },
  descripcion: { type: String },
  categoria: { type: String },
  subcategoria: { type: String },
  precio: { type: Number },
  fechaCreacion: { type: Date, default: Date.now },
  imagePath: { type: String, default: '/uploads/' }
});

var Producto = mongoose.model('Producto', ProductoSchema);
module.exports = Producto