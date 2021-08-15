const mongoose = require('mongoose')
const user_schema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name can't be empty"]

    },
    email:{
        type:String,
        required:[true,"Please enter email"],
        unique:true,
        index:true
    },
    password:{
        type:String,
        required:[true,"Please enter password"]
    },
    notes:[]



})
const User = mongoose.model('User', user_schema)
module.exports = User