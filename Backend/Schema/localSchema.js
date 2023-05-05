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
        products: [
            new mongoose.Schema({
                name: { type: String, required: true },
                description: { type: String, default: null },
                category: { type: String, default: null },
                subCategory: { type: String, default: null },
                price: { type: Number, default: undefined },
            })
        ],
        tags: [{ type: String, default: null }],
    },
);

//Se crea un metodo de instancia que devuelva todos los locales
LocalSchema.statics.getAllLocals = function () {
    return this.find({});
}

//Devuelve el local ingresado, ya sea por nombre o ID
LocalSchema.statics.getLocal = function (idLocal, nameLocal) {
    return this.findOne(
        {
            $or: [
                { _id: idLocal },
                { name: nameLocal }
            ]
        },
        {
            products: 1, _id: 1, name: 1
        }
    )
}

LocalSchema.statics.updateLocal = function (dataLocal) {
    return this.findOneAndUpdate(
        { _id: dataLocal._id },
        dataLocal,
        { new: true }
    )
}

LocalSchema.statics.deleteLocal = function (idLocal) {
    return this.findOneAndRemove({
        _id: idLocal
    })
}




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