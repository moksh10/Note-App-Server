const express = require('express')
const route = express.Router()
const {signup}=require('../controllers/signupController')
route.post('/signup',signup)
module.exports = route