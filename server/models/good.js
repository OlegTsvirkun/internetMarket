const mongoose = require('mongoose');   
const Schema = mongoose.Schema

const GoodSchema = new Schema({
    name:{
        type:String,
        required: true,
        index: true, 
        unique: true
    },
    articul:{
        type:String,
        required: true,
        index: true, 
        unique: true
    },
    description:{
        type:String,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    picture:{
        type:String,
        required: true
    },

    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
        
    },
    
})
const Good = mongoose.model('Good',GoodSchema)
module.exports = Good;