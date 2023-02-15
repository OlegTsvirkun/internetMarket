const mongoose = require('mongoose');   
const Schema = mongoose.Schema

const OrderCounterSchema = new Schema({
    count:{   
        type:Number,
        required: true
    },
}
)
const OrderCounter = mongoose.model('OrderCounter',OrderCounterSchema)
module.exports = OrderCounter;