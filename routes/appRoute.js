const express = require('express')
const route = express.Router()
const {auth} = require('../middleware/authmiddleware')
const User = require('../models/User')

route.get('/noteapp',auth,async(req,res)=>{
  
  try
  {
    const id = req.id
    const notes = await User.findById(id,{notes:1,_id:0})
    res.send(notes)
    
      
  }
  catch(error)
  {
      res.statusCode(404).send("Server Error")
  }

})
module.exports = route