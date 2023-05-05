var mongoose = require('mongoose');

var ordersSchema = new mongoose.Schema(    
    {
        date: { type: Date, default: Date.now },
        local: { type: Object },
        price: { type: Number, default: 0 },
    }
);

ordersSchema.methods.calculatePriceOrder = function (){
    //ACA POR CADA PRODUCTOS DE LLOCAL DEBERIA CALCULARSE EL PRECIO FINAL
    this.price = 100
}

const Order = mongoose.model('orders', ordersSchema);
module.exports = Order;