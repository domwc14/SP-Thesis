//This middleware checks if the user is authenticated
//then show the database

const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const requireAuth = async (req,res,next)=>{
    //verify authentication
    const {authorization} = req.headers
    if (!authorization){
        return res.status(401).json({error: "Log in ka muna par"})
    }
    //authorization = 'Bearer the3.string auth(iofjadf.fweioofnsd.fosidfn)
    const token = authorization.split(' ')[1]

    try {
        const{_id} = jwt.verify(token,process.env.SECRET_STRING)

        //attach user variable to the request so that
        //succeeding requests will have the user
        //.select id means you just get the _id , not the entire json object/doc
        req.user = await User.findOne({_id}).select('_id')
        next()
    }catch(error){
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }

}

module.exports = requireAuth