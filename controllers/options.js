const Data= require('../Data')
const jwt = require('jsonwebtoken')

const options = [
    { method: "post", path: "/users/register", description: "Register, Required: email, name, password", example: { body: { email: "user@email.com", name: "user", password: "password" } } },
    { method: "post", path: "/users/login", description: "Login, Required: valid email and password", example: { body: { email: "user@email.com", password: "password" } } },
    { method: "post", path: "/users/token", description: "Renew access token, Required: valid refresh token", example: { headers: { token: "\*Refresh Token\*" } } },
    { method: "post", path: "/users/tokenValidate", description: "Access Token Validation, Required: valid access token", example: { headers: { Authorization: "Bearer \*Access Token\*" } } },
    { method: "get", path: "/api/v1/information", description: "Access user's information, Required: valid access token", example: { headers: { Authorization: "Bearer \*Access Token\*" } } },
    { method: "post", path: "/users/logout", description: "Logout, Required: access token", example: { body: { token: "\*Refresh Token\*" } } },
    { method: "get", path: "api/v1/users", description: "Get users DB, Required: Valid access token of admin user", example: { headers: { authorization: "Bearer \*Access Token\*" } } }
  ]

exports.optionsFunc= (req,res)=>{
    if(!req.headers.authorization)
        return res.set({Allow: "OPTIONS, GET, POST"}).status(200).json([options[0], options[1]])
    const token = req.headers.authorization.split(' ')[1]
    const slicedToken = token.slice(0,token.length-1) // remove extra "
    jwt.verify(slicedToken, 'refreshToken',(err,userInfo)=>{
    if(err || !userInfo )
        return res.set({Allow: "OPTIONS, GET, POST"}).status(200).json([options[0], options[1], options[2], options[3]])
    if(userInfo.name!=='admin')
        return res.set({Allow: "OPTIONS, GET, POST"}).status(200).json([options[0], options[1], options[2],options[3],options[4],options[5]])

        return res.set({Allow: "OPTIONS, GET, POST"}).status(200).json(options)
})
}