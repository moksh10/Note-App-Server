const jwt = require("jsonwebtoken")
const User = require("../models/User")
const path = require('path')
require('dotenv').config({path:path.join(__dirname+"/../.env")})
exports.auth = async (req,res,next) => {
    try
    {
        if(!req.cookie.token)
        {
            res.status(403).json({message:"Please Login"})
            return
        }
        const token = req.cookie.token
        jwt.verify(token,process.env.JWT_PASSWORD,(err,decoded)=>{
            if(err)
            {
                 res.status(403).json({message:"Invalid Authorization"})
                  return
            }
            req.id = decoded.id
            res.json({loggedIn:true})
            next()
        })
        
        return
    
    }
    catch(error)
    {
        res.status(500).json({message:"Server Error"})

    }
   

}