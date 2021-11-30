const express = require('express')
const router = express.Router()
const {information, usersAdmin}= require('../controllers/api')
router.get('/v1/information', information)
router.get('/v1/users', usersAdmin)
module.exports = router