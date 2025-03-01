const { Schema, model } = require('mongoose');

const OrderSchema = new Schema({
    customerId : {
        type : Schema.ObjectId,
        required : true
    },
    products: {
        type: Array,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    payment_status: {
        type: String,
        required: true
    },
    deliverInformation: {
        type: Object,
        required: true
    },
    delivery_status: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = model('Order', OrderSchema);  
