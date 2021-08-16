const express = require('express')
const route = express.Router()
const {auth} = require('../middleware/authmiddleware')
const {AccountController} = require('../controllers/accountController')
route.get('/account', auth, AccountController.getUserInfo)
route.put('/account', auth, AccountController.updateUserInfo)
route.post('/account/logout', auth, AccountController.logoutUser)
module.exports = route 