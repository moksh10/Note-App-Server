const bcrypt = require('bcrypt')
const User = require('../models/User')
exports.signup = async (req,res) =>{
    try
    {
        if(!req.body.password)
        {
            res.status(400).send("Please enter password")
            return

        }
        const salt = await bcrypt.genSalt()
        const password =await bcrypt.hash(req.body.password,salt)
        const newUser = new User({
            name:req.body.name,
            email:req.body.email,
            password:password
        })
        const result = await newUser.save()
        res.status(201).send("User account created")
        
    }
    catch(error)
    {
        if(error.code === 11000)
        {
            res.status(400).send("User already exists")
            return 
        }
        res.status(400).send(error.message.split(":")[2])

    }

    

}