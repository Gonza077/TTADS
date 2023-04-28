var mongoose = require('mongoose');

var LocalSchema = new mongoose.Schema({
    name: { type: String , required: true, unique: true},
    email: { type: String, required: true},
    phone: { type: String, default: null},
    address: { type: String, required: true},
    isActive: { type: Boolean, default: false },
    registered: { type: Date, default: Date.now },
    products:[],
    tags: [{ 
        value: { type: String, default: null}
    }],     
});

var Local = mongoose.model('locals', LocalSchema);
module.exports = Local;