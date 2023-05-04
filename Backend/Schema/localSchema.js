var mongoose = require('mongoose');
var productSchema = require("./productSchema");

var LocalSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, default: null },
        phone: { type: String, default: null },
        address: { type: String, required: true },
        isActive: { type: Boolean, default: false },
        registered: { type: Date, default: Date.now },
        products: [productSchema.schema],
        tags: [{ type: String, default: null }],
    }
);

// LocalSchema.methods.getProductsOrder = function (products){
//     products.forEach((element) => {
//         console.log(element)
//     });
//     // Local.findOne(
//     //     {
//     //         _id: idLocal,
//     //         products: {
//     //             $elemMatch: {
//     //                 $or: [
//     //                     { _id: mongoose.Types.ObjectId(req.query.idProduct) },
//     //                     { name: req.query.nameProduct }
//     //                 ]
//     //             }
//     //         },
//     //     },
//     //     {
//     //         "products.$": 1,
//     //     }
//     // )
// }


var Local = mongoose.model('locals', LocalSchema);
module.exports = Local;