const mongoose = require('mongoose');
const Schema = mongoose.Schema

const OrderStatusSchema = new Schema({
    value:{ 
        type:String,
        unique:true,
        default: "REGISTERED" // "Awaiting payment" , "paid","confirmed ",completed , cancelled
    }
})

const OrderStatus = mongoose.model('OrderStatus',OrderStatusSchema)
module.exports = OrderStatus