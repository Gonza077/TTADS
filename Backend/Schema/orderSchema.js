var mongoose = require('mongoose');
const Local = require("./localSchema")

var ordersSchema = new mongoose.Schema(
    {
        date: { type: Date, default: Date.now },
        local: { type: mongoose.Types.ObjectId, ref: 'locals', required: true },
        //Si son referencias a objectIDs tengo que guardarlos dentro
        //de la orden por que dentro del local no se puede
        products: { type: [{ type: mongoose.Types.ObjectId, ref: 'products' }], required: true },
        price: { type: Number, default: 0 },
    }
);

ordersSchema.methods.calculatePriceOrder = function () {
    this.local.products.forEach(Prod => {
        this.price += Prod.price;
    });
}

ordersSchema.methods.setLocal = function (local) {
    this.local = local;
}

const Order = mongoose.model('orders', ordersSchema);
module.exports = Order;