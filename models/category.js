const mongoose = require('mongoose');   
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    category:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    }
})
const Category = mongoose.model('Category',CategorySchema)
module.exports = Category;