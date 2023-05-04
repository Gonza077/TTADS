var mongoose = require('mongoose');

var ordersSchema = new mongoose.Schema(    
    {
        date: { type: Date, default: Date.now },
        local: { type: Object },
        price: { type: Number, default: 0 },
    }
);

ordersSchema.methods.calculatePriceOrder = function (){
    console.log(this.price)
}

const Order = mongoose.model('orders', ordersSchema);
module.exports = Order;