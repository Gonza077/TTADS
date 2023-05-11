var mongoose = require('mongoose');

var LocalSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String },
        phone: { type: String },
        address: { type: String, required: true },
        isActive: { type: Boolean },
        registered: { type: Date, default: Date.now },
        products: { type: [ { type: mongoose.Types.ObjectId, ref: 'products' } ]},
        tags: { type: [], default: undefined }
    },
);

var Local = mongoose.model('locals', LocalSchema);
module.exports = Local;