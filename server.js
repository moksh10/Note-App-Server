require('./db/conn')
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const compression = require('compression')
const audit = require('express-requests-logger')
const app = express()
const signupRoute = require('./routes/signupRoute')
const loginRoute = require('./routes/loginRoute')
const authRoute = require('./routes/authRoute')
const appRoute = require('./routes/appRoute')
const accountRoute = require('./routes/accountRoute')
app.use(compression())
app.use(express.json({}))
app.use(cookieParser())
app.set('trust proxy', 1)
app.use(cors({
    origin: "https://silly-fermat-351e67.netlify.app",
    credentials: true,
    
    
}))
app.use(audit())
app.use(signupRoute)
app.use(loginRoute)
app.use(authRoute)
app.use(appRoute)
app.use(accountRoute)
app.use("*",(req,res)=>{
    res.status(404).json({message:"No resource found"})

})
app.listen(process.env.PORT || 5000,()=>{
    console.log("server started")

})
