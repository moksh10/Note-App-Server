const jwt = require("jsonwebtoken")
const User = require("../models/User")
const path = require('path')
require('dotenv').config({path:path.join(__dirname+"/../.env")})
exports.auth = async (req,res,next) => {
    try
    {
        if(!req.headers.authorization)
        {
            res.status(403).send("Please Login")
            return
        }
        const token = req.headers.authorization.split(' ')[1]
        jwt.verify(token,process.env.JWT_PASSWORD,(err,decoded)=>{
            if(err)
            {
                 res.status(403).send("Invalid Authorization")
                  return
            }
            req.id = decoded.id
            next()
        })
        
        return
    
    }
    catch(error)
    {
        res.status(500).send("Server Error")

    }
   

}