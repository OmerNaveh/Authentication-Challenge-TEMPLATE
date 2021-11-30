const express = require('express')
const router = express.Router()
const {signUp, signIn, tokenValidate, token,logOut}=require('../controllers/users')

router.post('/register',signUp)
router.post('/login',signIn)
router.post('/tokenValidate',tokenValidate)
router.post('/token',token)
router.post('/logout',logOut)


module.exports = router