var mongoose = require('mongoose');

var ProductoSchema = new mongoose.Schema({
  name: { type: String | undefined },
  description: { type: String | undefined },
  category: { type: String | undefined },
  subCategory: { type: String | undefined },
  price: { type: Number | undefined },
  imagePath: { type: String | undefined }
});

var Producto = mongoose.model('products', ProductoSchema);
module.exports = Producto