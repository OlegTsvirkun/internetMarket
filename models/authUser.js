const mongoose = require('mongoose');
const Schema = mongoose.Schema

const AuthUserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    role:  [{ type: String, ref: 'AuthRole'}]
    
})
const AuthUser = mongoose.model('AuthUser', AuthUserSchema)
module.exports = AuthUser