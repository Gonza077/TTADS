var mongoose = require('mongoose');

var ordersSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    local: { type: Object | undefined },
    price: { type: Number | undefined },
});

module.exports = ordersSchema;