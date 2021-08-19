const User = require("../models/User")
const message = {message:"Server Error"}
const getNotes = async(req,res)=>{
  
    try
    {
      const id = req.id
      const result = await User.findById(id,{notes:1,_id:0})
      return res.status(202).json(result)
      
        
    }
    catch(error)
    {
        
        res.status(500).json({message:"Server Error"})
    }
}    
const createNote = async(req,res)=>{
    try{
        if(!req.body.heading)
        {
            res.status(400).json({message:"Please enter note heading"})
            return
        }
        if(!req.body.content)
        {
            res.status(400).json({message:"Please enter note content"})
            return
       

        }
      const id = req.id
      const result = await User.findById(id,{notes:1,_id:0})
      const notes = result.notes
      notes.push({heading:req.body.heading, content:req.body.content})
      const data = await User.findByIdAndUpdate(id,{$set:{notes:notes}})
      res.status(201).json({created:true})
      return
        
    }
    catch(error)
    {
        res.status(500).json({message:"Server Error"})
    }

}
const updateNote = async(req,res)=>{
    try{
        
        const id = req.id
        if(req.body.idx===undefined)
        {
            res.status(400).json({message:"Please select note to be updated"})
            return

        }
        if(!req.body.heading||!req.body.content)
        {
            res.status(404).json({message:"Selected note is not present in database"})
            return
        }
        const idx = req.body.idx
        const result = await User.findById(id,{notes:1,_id:0})
        const notes = result.notes
        if(idx>=notes.length)
        {
            
            res.status(404).json({message:"Selected note is not present in database"})
            return

        }
        notes[idx].heading = req.body.heading
        notes[idx].content = req.body.content
        const data = await User.findByIdAndUpdate(id,{$set:{notes:notes}})
        res.status(202).json({updated:true})
        return
          
      }
      catch(error)
      {
          res.status(500).json(message)
      }
}
const deleteNote = async(req,res)=>{
    try{
        
        const id = req.id
        if(req.body.idx===undefined)
        {
            res.status(400).json({message:"Please select note to be deleted"})
            return

        }
        const idx = req.body.idx
        const result = await User.findById(id,{notes:1,_id:0})
        const notes = result.notes
        if(idx>=notes.length)
        {
            
            res.status(404).json({message:"Selected note is not present in database"})
            return

        }
        notes.splice(idx,1);
        const data = await User.findByIdAndUpdate(id,{$set:{notes:notes}})
        res.status(202).json({deleted:true})
        return
           
      }
      catch(error)
      {
          res.status(500).json(message)
      }

}
exports.AppController = {getNotes,createNote, updateNote, deleteNote}