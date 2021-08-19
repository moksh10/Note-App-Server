const jwt = require("jsonwebtoken")
const User = require("../models/User")
const path = require('path')
require('dotenv').config({path:path.join(__dirname+"/../.env")})
exports.auth = async (req,res,next) => {
    try
    {
        if(!req.cookies)
        {
            return res.status(403).json({message:"Please Login"})
            
        }
        const token = req.cookies.token
        jwt.verify(token,process.env.JWT_PASSWORD,(err,decoded)=>{
            if(err)
            {
                return res.status(403).json({message:"Invalid Authorization"})
                  
            }
            req.id = decoded.id
            if(req.path==="/auth")
            {
                
            res.json({loggedIn:true})
            return

            }
            next()
            return
        })
        
    
    }
    catch(error)
    {
        res.status(500).json({message:"Server Error"})
        

    }
   

}