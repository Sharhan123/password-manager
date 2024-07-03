const express = require('express')

const router = express.Router()
const userController  = require('../controllers/userController')
router.post('/userRegister',userController.userRegister)
router.post('/userSignin',userController.userSignin)
router.post('/savePassword',userController.savePassword)
router.get('/getPasswords',userController.getPasswords)

module.exports = router