const Data= require('../Data')
exports.signUp = (req,res)=>{
    if(Data.USERS.find(user=> user.name===req.body.user))
        return res.status(409).send('user already exists')
    Data.USERS.push(req.body);
    Data.INFORMATION[0] = {email: req.body.email, info: `${req.body.user} info`}
    return res.status(201).send("Register Success");
}