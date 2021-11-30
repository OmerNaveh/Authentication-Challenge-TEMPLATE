const Data= require('../Data')
const jwt = require('jsonwebtoken');

exports.information = (req,res)=>{
    if(!req.headers.authorization)
        return res.status(401).send("Access Token Required")
    const token = req.headers.authorization.split(' ')[1]
    const slicedToken = token.slice(0,token.length-1) // remove extra "
    jwt.verify(slicedToken, 'refreshToken',(err,userInfo)=>{
        const validUser =Data.INFORMATION.find(user=> user.email === userInfo.email)
        if(err || !validUser)
            return res.status(403).send("Invalid Access Token")
        return res.status(200).json(validUser)
    })
}

exports.usersAdmin = (req,res)=>{
    if(!req.headers.authorization)
        return res.status(401).send("Access Token Required")
    const token = req.headers.authorization.split(' ')[1]
    const slicedToken = token.slice(0,token.length-1) // remove extra "
    jwt.verify(slicedToken, 'refreshToken',(err,userInfo)=>{
        if(err || !userInfo || userInfo.name!=='admin')
            return res.status(403).send("Invalid Access Token")
        return res.status(200).json(Data.USERS)
    })

}