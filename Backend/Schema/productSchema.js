var mongoose = require('mongoose');

var productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true},
        description: { type: String, default: null} ,
        category: { type: String, default: null} ,
        subCategory: { type: String, default: null} ,
        price: { type: Number, default: undefined} ,
    }
);

const Product = mongoose.model('products', productSchema);
module.exports = Product;