const path = require('path')
require('dotenv').config({path:path.join(__dirname+"/../.env")})
const mongoose = require('mongoose')
mongoose.connect(process.env.DB_CONNECT,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Connected")
})