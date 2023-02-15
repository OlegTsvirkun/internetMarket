const mongoose = require('mongoose');   
const Schema = mongoose.Schema

const ImageSchema = new Schema({
    image:{
        type:String,
        required: true
    },
    goodId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required: true
    }
})
const Image = mongoose.model('Image',ImageSchema)
module.exports = Image;