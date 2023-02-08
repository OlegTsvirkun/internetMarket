const mongoose = require('mongoose');   
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    userId:{
        // type: String,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AuthUser',
        required: false,
    },
    userContacts:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    goods:{
        type:[],
        
        required: true
    },
    delivery:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderDelivery',
        required: true
    },
    
    totalPrice:{
        type:Number,
        required: true
    },
    orderId:{
        type:Number,
        required: true
    },
    
    status:{
        type: String, 
        ref: 'OrderStatus',
        required: true
    },
    
  
},
{
    timestamps:true
}
)
const Order = mongoose.model('Order',OrderSchema)
module.exports = Order;