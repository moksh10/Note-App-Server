const express = require('express')
const route = express.Router()
const {auth} = require('../middleware/authmiddleware')
route.get('/auth',auth)
module.exports = route