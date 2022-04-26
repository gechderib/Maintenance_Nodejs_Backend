const jwt = require("jsonwebtoken")
const jwtSecret = require("../config/auth.config")
const db = require("../models/index")
const User = db.user
const Role = db.roles

verifyToken = (req,res,next)=>{
    
    let token = req.headers["x-access-token"];
    console.log(token+"loooooooooooooooop")
    if(!token){
        res.status(500).send({message:"Unauthorized user no token"})
        return
    }
    jwt.verify(token,jwtSecret.secret,(err,decoded)=>{
        if(err){
            console.log("here erroe hapne")
            res.status(500).send({message:err})
            return
        }
        req.userId = decoded.id,
        next()
    })
}

isAdmin = (req,res,next)=>{
    User.findById(req.userId).exec((err,user)=>{
        if(err){
            res.status(500).send({message:err})
        }
        Role.find({
            _id:{$in: user.roles}
        },(err,roles)=>{
            if(err){
                res.status(500).send({message:err})
                return;
            }
            for(let i=0;i<roles.length;i++){
                if(roles[i].name == 'admin'){
                    
                    next()
                    return;
                }
            }
            res.status(403).send({message:"Require admin role"})
        })  
    })
}

isTech = (req,res,next)=>{
    User.findById(req.userId).exec((err,user)=>{
        if(err){
            res.status(500).send({message:err})
            return;
        }
        Role.find({
            _id: {$in: user.roles}
        },(err,roles)=>{
            if(err){
                res.status(500).send({message:err})
                return
            }
            for(let i = 0;i<roles.length;i++){
                if(roles[i].name == "tech"){
                    next()
                    return;
                }
            }
            res.status(403).send({message:"Require tech role"})
        })
    })
}


const authJwt = {
    verifyToken,
    isAdmin,
    isTech
}

module.exports = authJwt