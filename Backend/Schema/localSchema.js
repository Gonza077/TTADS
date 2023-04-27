var mongoose = require('mongoose');

var LocalSchema = new mongoose.Schema({
    name: { type: String , required: true, unique: true},
    email: { type: String, required: true},
    phone: { type: Number, default: null},
    address: { type: String, required: true},
    isActive: { type: Boolean, default: false },
    registered: { type: Date, default: Date.now },
    products:[{}],
    // products: [{
    //     name:  String | undefined,
    //     description:  String | undefined ,
    //     category: String | undefined ,
    //     subCategory: String | undefined ,
    //     price: Number | undefined ,
    // }],
    tags: [],
    // tags: [{ 
    //     value:  { type: String , required: true}
    // }],      
});

var Local = mongoose.model('locals', LocalSchema);
module.exports = Local;