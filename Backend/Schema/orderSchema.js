var mongoose = require('mongoose');
const Local = require("./localSchema")

var ordersSchema = new mongoose.Schema(    
    {
        date: { type: Date, default: Date.now },
        local: {type: Local.schema},
        price: { type: Number, default: 0 },
    }
);

ordersSchema.methods.calculatePriceOrder = function (){
    //ACA POR CADA PRODUCTOS DE LLOCAL DEBERIA CALCULARSE EL PRECIO FINAL
    this.local.products.forEach(Prod => {
        this.price += Prod.price; 
    });
}

ordersSchema.methods.setLocal = function (local){
    this.local = local;
}

const Order = mongoose.model('orders', ordersSchema);
module.exports = Order;