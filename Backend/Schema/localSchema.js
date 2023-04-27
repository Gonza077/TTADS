var mongoose = require('mongoose');

var LocalSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, default: " " },
    phone: { type: Number, default: " " },
    address: { type: String },
    isActive: { type: Boolean, default: false },
    registered: { type: Date, default: Date.now },
    products: [{
        name: { type: String | undefined },
        description: { type: String | undefined },
        category: { type: String | undefined },
        subCategory: { type: String | undefined },
        price: { type: Number | undefined },
        imagePath: { type: String , default: '/uploads/' }
    }],
    tags: [
        { value: String | undefined },
    ],
});

var Local = mongoose.model('locals', LocalSchema);
module.exports = Local;