const express = require('express')
const route = express.Router()
const {auth} = require('../middleware/authmiddleware')
const {AppController} = require('../controllers/noteappController')
const path = '/noteapp' 

route.get(path,auth, AppController.getNotes)
/*
route.post(path, auth, AppController.createNote )

route.put(path, auth, AppController.updateNote)

route.delete(path, auth, AppController.deleteNote)
*/

module.exports = route