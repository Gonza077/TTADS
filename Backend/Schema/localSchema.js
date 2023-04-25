var mongoose = require('mongoose');

var LocalSchema = new mongoose.Schema({
    company: { type: String | undefined },
    balance: {type: Number | undefined},
    email :{type: String | undefined},
    phone : {type: Number | undefined},
    products: {type: String},
    address: { type: String | undefined },
    tags: {type: String},
    isActive : {type: Boolean | undefined},
    registered :{type: Date}
    // imagePath: { type: String, default: '/uploads/' },
});

var Local = mongoose.model('locals', LocalSchema);
module.exports = Local;