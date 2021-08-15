const mongoose = require('mongoose')
const user_schema = mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    email:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    password:{
        type:String,
        required:true
    },
    notes:[]



})
const User = mongoose.model('User', user_schema)
module.exports = User