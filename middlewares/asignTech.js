const db = require("../models/index")

const User = db.user
const MaintenanceProblem = db.maintenanceProblem;

checkTechExisted = (req,res,next)=>{

    User.findOne({email:req.body.email},(err,user)=>{
        if(err){
            res.status(500).send({message:err})
            return
        }
        if(!user){
            res.status(404).send({message:"No such technician existed"})
        }
        req.techInfo = user

        next()
    })
}

checkPropAssigned = (req,res,next)=>{
    User.findById(req.userId).exec((err,user)=>{
        if(err){
            res.status(500).send({message:err})
            return
        }
        req.assignedProbList = user
        next()
    })
}



const asignTech = {
    checkTechExisted,
    checkPropAssigned
}





module.exports = asignTech