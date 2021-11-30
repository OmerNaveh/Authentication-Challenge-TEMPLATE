
const express = require('express')
const router = express.Router()
const userRouter = require('./routers/userRouter')
const apiRouter = require('./routers/apiRouter')


router.use('/users', userRouter)
router.use('/api',apiRouter)

module.exports = router