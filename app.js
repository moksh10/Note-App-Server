require('./db/conn')
const path = require('path')
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()
const signupRoute = require('./routes/signupRoute')
const loginRoute = require('./routes/loginRoute')
const authRoute = require('./routes/authRoute')
const appRoute = require('./routes/appRoute')
const accountRoute = require('./routes/accountRoute')
app.use(express.json({}))
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))
app.use(cookieParser())
app.use(signupRoute)
app.use(loginRoute)
app.use(authRoute)
app.use(appRoute)
app.use(accountRoute)
app.all('*',(req,res)=>{
    res.status(404).json({message:"No resource found"})
})
app.listen(process.env.PORT,()=>{
    console.log(`Listening at port ${process.env.PORT}`)
})
