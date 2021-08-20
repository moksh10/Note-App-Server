const mongoose = require('mongoose')
const validator = require('validator');
const user_schema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name can't be empty"],
        minlength:[1,"Username can't be empty"],
        maxlength:[30,"Username length exceeded: 30"]

    },
    email:{
        type:String,
        required:[true,"Please enter email"],
        unique:true,
        index:true,
        validate: {
            validator: (value) => {
              return validator.isEmail(value);
            },
            message:"Please enter a valid email"
          }
    },
    password:{
        type:String,
        required:[true,"Please enter password"]
    },
    notes:[]



})
const User = mongoose.model('User', user_schema)
module.exports = User