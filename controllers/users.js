const Data= require('../Data')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.signUp = async(req,res)=>{
    if(Data.USERS.find(user=> user.name===req.body.name))
        return res.status(409).send('user already exists')
    req.body.password = await bcrypt.hash(req.body.password,10)
    Data.USERS.push(req.body);   
    Data.INFORMATION.push({email: req.body.email, info: `${req.body.name} info`}) 
    return res.status(201).send("Register Success");
}

exports.signIn = async(req,res)=>{
    const userInfo = Data.USERS.find(user=> user.email===req.body.email)
    if(!userInfo)
        return res.status(404).send('cannot find user');
    if(!await bcrypt.compare(req.body.password,userInfo.password))
        return res.status(403).send('User or Password incorrect');
    const accessToken = generateToken(userInfo, 'accessToken', '10s')
    const refreshToken = generateToken(userInfo, 'refreshToken')
    Data.REFRESHTOKENS.push(refreshToken);
    return res.status(200).json({accessToken, refreshToken, email:userInfo.email, name:userInfo.name, isAdmin:userInfo.isAdmin})
}

exports.tokenValidate = (req,res)=>{
    if(!req.headers.authorization)
        return res.status(401).send('Access Token Required')
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, 'refreshToken',(err,userInfo)=>{
        if(err) return res.status(403).send("Invalid Access Token")
        return res.status(200).json({valid: true})
    })   
}

exports.token = (req,res)=>{
    const token= req.body.token;
    if(!token) return res.status(401).send('Refresh Token Required')
    if(!Data.REFRESHTOKENS.includes(token)) return res.status(403).send("Invalid Access Token")
    jwt.verify(token , 'refreshToken', (err,userInfo)=>{
        if(err) return res.status(403).send("Invalid Access Token")
        const accessToken = generateToken({email:userInfo.email,name:userInfo.name, isAdmin:userInfo.isAdmin, password:userInfo.password },
            'refreshToken');
        Data.REFRESHTOKENS.push(accessToken);
        return res.status(200).json({accessToken})
    })
}

exports.logOut = (req,res)=>{
    const token = req.body.token;
    if(!token) return res.status(401).send('Refresh Token Required')
    if(!Data.REFRESHTOKENS.includes(token)) return res.status(400).send("Invalid Refresh Token")
    jwt.verify(token , 'refreshToken', (err,userInfo)=>{
        if(err) return res.status(400).send("Invalid Refresh Token")
        Data.REFRESHTOKENS.filter(refreshToken=> refreshToken!==token); // remove token from array
        return res.status(200).send("User Logged Out Successfully")
    })

}


const generateToken = (data,secret, expiresIn)=>{
    if(expiresIn)
    return jwt.sign(data,secret,{expiresIn:expiresIn}) // access Token
    return jwt.sign(data,secret) //refresh Token

}