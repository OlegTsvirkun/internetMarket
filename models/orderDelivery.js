const mongoose = require('mongoose');   
const Schema = mongoose.Schema

const OrderDeliverySchema = new Schema({

    delivery:{
        type:String,
        required: true
    },
    city:{
        type:String,
        required: true
    },
    street:{
        type:String,
        required: true
    },
    house:{   
        type:Number,
        required: true
    },
    litHouse:{
        type:String,
        required: true
    },
    appartment:{
        type:Number,
        required: true
    },
    postNP:{
        type:String,
        required: true
    },
},

)
const OrderDelivery = mongoose.model('OrderDelivery',OrderDeliverySchema)
module.exports = OrderDelivery;