const mongoose = require('mongoose');   
const Schema = mongoose.Schema

const ShopContactSchema = new Schema({

    type:{
        type:String,
        required: false
    },
    name:{
        type:String,
        required: false 
    },
    city:{
        type:String,
        required: true
    },
    address:{
        type:String,
        required: true,
        index: true, 
        unique: true
    },
    tel:{   
        type:Array,
        required: true
    },
    email:{
        type:String,
        required: true,
        index: true, 
        unique: true
    },
    scheduling:{
        type:Schema.Types.Mixed,
        required: true
    },
    holiday:{
        type:[Date],
        required: false
    },
    
},

)
const ShopContact = mongoose.model('ShopContact',ShopContactSchema)
module.exports = ShopContact;