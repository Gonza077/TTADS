var mongoose = require('mongoose');

var ordersSchema = new mongoose.Schema(    
    {
        date: { type: Date, default: Date.now },
        local: { 
            _id : { type: String, default: null }, 
            products : [],
        },
        price: { type: Number, default: 0 },
    }
);

ordersSchema.methods.calculatePriceOrder = function (){
    //ACA POR CADA PRODUCTOS DE LLOCAL DEBERIA CALCULARSE EL PRECIO FINAL
    this.local.products.forEach(Prod => {
        this.price += Prod.price; 
    });
}

ordersSchema.methods.setIDLocal = function (idLocal){
    this.local._id = idLocal
}

ordersSchema.methods.setPorducts = function (products){
    //ACA POR CADA PRODUCTOS DE LLOCAL DEBERIA CALCULARSE EL PRECIO FINAL
    this.local.products = products
}

const Order = mongoose.model('orders', ordersSchema);
module.exports = Order;