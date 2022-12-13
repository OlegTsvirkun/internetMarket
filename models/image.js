const mongoose = require('mongoose');   
const Schema = mongoose.Schema

const ImageSchema = new Schema({
    image:{
        type:Array,
        required: true
    },
    goodId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})
const Image = mongoose.model('Image',ImageSchema)
module.exports = Image;