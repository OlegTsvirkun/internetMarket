const mongoose = require('mongoose');   
const Schema = mongoose.Schema

const NotebookSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    articul:{
        type:String,
        required: true
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
const Notebook = mongoose.model('Notebook',NotebookSchema)
module.exports = Notebook;