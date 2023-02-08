const mongoose = require('mongoose');   
const Schema = mongoose.Schema

const OrderDeliverySchema = new Schema({

    delivery:{
        type:String,
        required: true
    },
    city:{
        type:String,
        required: false
    },
    street:{
        type:String,
        required: false
    },
    house:{   
        type:Number,
        required: false
    },
    litHouse:{
        type:String,
        required: false
    },
    appartment:{
        type:String,
        required: false
    },
    postNP:{
        type:String,
        required: false
    },
    office:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ShopContact' ,
        required: false,
    },
},

)
const OrderDelivery = mongoose.model('OrderDelivery',OrderDeliverySchema)
module.exports = OrderDelivery;