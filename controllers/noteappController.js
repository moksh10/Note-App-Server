const User = require("../models/User")

const getNotes = async(req,res)=>{
  
    try
    {
      const id = req.id
      const result = await User.findById(id,{notes:1,_id:0})
      res.send(result)
      
        
    }
    catch(error)
    {
        res.statusCode(500).send("Server Error")
    }
}    
const createNote = async(req,res)=>{
    try{
        
      const id = req.id
      const result = await User.findById(id,{notes:1,_id:0})
      const notes = result.notes
      notes.push({heading:req.body.heading, content:req.body.content})
      const data = await User.findByIdAndUpdate(id,{$set:{notes:notes}},{new:true})
      res.send(data)
        
    }
    catch(error)
    {
        res.send(error.message)
    }

}
const updateNote = async(req,res)=>{
    try{
        
        const id = req.id
        const idx = req.body.idx
        const result = await User.findById(id,{notes:1,_id:0})
        const notes = result.notes
        notes[idx].heading = req.body.heading
        notes[idx].content = req.body.content
        const data = await User.findByIdAndUpdate(id,{$set:{notes:notes}},{new:true})
        res.send(data)
          
      }
      catch(error)
      {
          res.statusCode(500).send("Server Error")
      }
}
const deleteNote = async(req,res)=>{
    try{
        
        const id = req.id
        const idx = req.body.idx
        const result = await User.findById(id,{notes:1,_id:0})
        const notes = result.notes
        notes.splice(idx,1);
        const data = await User.findByIdAndUpdate(id,{$set:{notes:notes}},{new:true})
        res.send(data)
          
      }
      catch(error)
      {
          res.statusCode(500).send("Server Error")
      }

}
exports.AppController = {getNotes,createNote,updateNote,deleteNote}