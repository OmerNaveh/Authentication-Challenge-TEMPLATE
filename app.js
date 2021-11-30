
const express = require('express')
const router = express.Router()
const userRouter = require('./routers/userRouter')
const apiRouter = require('./routers/apiRouter')
const {optionsFunc} = require('./controllers/options')


router.use('/users', userRouter)
router.use('/api',apiRouter)
router.options('/', optionsFunc)
module.exports = router