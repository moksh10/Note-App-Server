const path = require('path')
require('dotenv').config({path:path.join(__dirname+"/../.env")})
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createToken = (id) =>{
  return jwt.sign({id},process.env.JWT_PASSWORD,{ expiresIn:process.env.JWT_EXPIRY})

}

exports.login = async (req,res) => {
   try
   {
    const {email, password} = req.body
    const info = await User.find({email},{_id:1,password:1})
    if(info.length===0)
    {
        res.status(404).send("User not found")
        return
    }
    
    const check = await bcrypt.compare(password,info[0].password)
    if(check)
    {
        const token = createToken(info[0]._id)
        res.json({status:true,token:token})
        return

    }
    res.status(403).send("Incorrect Password")

   }
   catch(error)
   {
       res.status(500).send(error.message)
   }

    

} 