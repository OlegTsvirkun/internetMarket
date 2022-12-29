const mongoose = require('mongoose');   
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    goodId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Good',
        required: true
    },
    delivery:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderDelivery',
        required: true
    },
    count:{   
        type:String,
        required: true
    },
    price:{
        type:String,
        required: true
    },
    totalPrice:{
        type:Number,
        required: true
    },
    orderId:{
        type:Number,
        required: true
    }
},
{
    timestamp:true
}
)
const Order = mongoose.model('Order',OrderSchema)
module.exports = Order;