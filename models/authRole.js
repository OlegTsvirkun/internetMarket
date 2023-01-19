const mongoose = require('mongoose');
const Schema = mongoose.Schema

const AuthRoleSchema = new Schema({
    value:{
        type:String,
        unique:true,
        default: "USER"
    }
})

const AuthRole = mongoose.model('AuthRole',AuthRoleSchema)
module.exports = AuthRole