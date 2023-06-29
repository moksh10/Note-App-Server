const path = require('path')
require('dotenv').config({path:path.join(__dirname+"/../.env")})
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createToken = (id) =>{
  return jwt.sign({id},process.env.JWT_PASSWORD,{ expiresIn:60*60*1000})

}

exports.login = async (req,res) => {
   try
   {
    if(!req.body.email)
    {
        
        res.status(400).json({message:"Please enter email"})
        return

    }
    if(!req.body.password)
    {
        res.status(400).json({message:"Please enter password"})
        return
    }

    const {email, password} = req.body
    const info = await User.find({email},{_id:1,password:1})
    if(info.length===0)
    {
        res.status(404).json({message:"User not found"})
        return
    }
    
    const check = await bcrypt.compare(password,info[0].password)
    if(check)
    {
        const token = createToken(info[0]._id)
        res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite:'none',
            expires:new Date(Date.now() + 60*60*1000),
            
        })
        
        res.status(200).json({loggedIn:true})
        return

    }
    res.status(403).json({message:"Incorrect Email or Password"})

   }
   catch(error)
   {
       console.log(error)
       res.status(500).json({message:"Server Error"})
   }

    

} 