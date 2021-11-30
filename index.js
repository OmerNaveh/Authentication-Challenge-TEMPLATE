
const express = require('express');
const app = express()
const router = require('./app')
const port = 3000
app.use(express.json())
app.use('/',  router)
app.listen(port, ()=>{console.log(`running on ${port}`);})