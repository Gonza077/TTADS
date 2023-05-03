var mongoose = require('mongoose');
var productSchema = require("./productSchema");

var LocalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, default: null },
    phone: { type: String, default: null },
    address: { type: String, required: true },
    isActive: { type: Boolean, default: false },
    registered: { type: Date, default: Date.now },
    products: [productSchema.schema],
    tags: [{ type: String, default: null }],
});

var Local = mongoose.model('locals', LocalSchema);
module.exports = Local;