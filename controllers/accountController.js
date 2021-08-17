const User = require("../models/User")
const bcrypt = require('bcrypt')
const getUserInfo = async(req,res)=>{
    try{
        const id = req.id
        const result = await User.findById(id,{_id:0,name:1,email:1})
        res.json(result)
    
    }
    catch(error){
        res.status(500).json({message:"Server Error"})
    }
} 

const updateUserInfo = async(req,res)=>{
    try{
        
        const id = req.id
        if(!req.body.newPassword)
        {
            res.status(400).json({message:"Please enter new password"})
            return
        }
        const salt = await bcrypt.genSalt()
        const password = await bcrypt.hash(req.body.newPassword,salt)
        const result = await User.findByIdAndUpdate(id,{password:password})
        res.json({updated:true})


    }
    catch(error)
    {
        res.status(500).json({message:"Server Error"})
    }

}
const logoutUser = async(req,res)=>{
    try{

        res.clearCookie("token",
       { path: '/'
      })

    }
    catch(error)
    {
        res.status(500).send("Server Error")

    }

}

exports.AccountController = {getUserInfo, updateUserInfo, logoutUser}