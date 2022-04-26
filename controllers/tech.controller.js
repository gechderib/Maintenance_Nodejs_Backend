const db = require("../models/index")
const MaintenanceProplem = db.maintenanceProblem
const Solution = db.maintenanceSoln
const User = db.user


exports.addSolution = (req,res)=>{
    const solutions = new Solution({
        brand:req.body.brand,
        model:req.body.model,
        problemFaced:req.body.problemFaced,
        problemSoln:req.body.problemSoln,
        timeStarted:req.body.timeStarted,
        timeEnded:req.body.timeEnded,
        isFixed:req.body.isFixed,
        problemDescription:req.body.problemDescription,
        coordinator:req.body.coordinator,
        rate:req.body.rate,
        ratedBy:req.body.ratedBy,
        questionOwnerId:req.body.questionOwnerId
    })

    solutions.save((err,solutions)=>{
        if(err){
            res.status(500).send({message:err})
            return
        }
        User.findById(req.userId).exec((err,user)=>{
            if(err){
                res.status(500).send({message:err})
                return
            }
            solutions.solvedBy = user;
            solutions.save(err=>{
                if(err){
                    res.status(500).send({message:err})
                    return;
                }
                res.status(201).send({message:"solution successfully added"})
            })
        })
    })

}

exports.getAllSolutions = (req,res)=>{
    Solution.find({},(err,solutions)=>{
        if(err){
            res.status(500).send({message:err})
            return
        }
        res.status(200).send(solutions)
    })
}

exports.getAssignedProblems = (req,res)=>{
    const assignedList = req.assignedProbList
    console.log("dddddddddddddddddddddddddddddd")
    res.status(200).send(assignedList)
}


exports.getAllTech = (req,res)=>{
    User.find({},(err,user)=>{

        if(err){
            
            res.status(500).send({message:err})
            return
        }
        res.status(200).send(user)
    })
}


exports.getAskedQuestions = (req,res)=>{
    Solution.find({questionOwnerId:req.userId}).exec((err,solutions)=>{
        if(err){
            res.status(500).send({message:err})
            return
        }
        console.log(solutions)
        res.status(200).send(solutions)
        Solution.findByIdAndUpdate()
        
    })
}

exports.getYourProblems = (req,res)=>{
    console.log("jjjjjjjjjjjjjjkkkkkkkkkkk")
    MaintenanceProplem.find({postedBy:req.userId}).exec((err,problems)=>{
        if(err){
            res.status(500).send({message:err})
            return
        }
        console.log(problems)
        res.status(200).send(problems)
    })
}

exports.getOneSolution = (req, res)=>{
    const id = req.params.id;
    console.log("9999999999999999999999999")
    Solution.findById(id).exec((err,solution)=>{
        if(err){
            res.status(500).send({message:err})
            return
        }
        console.log(solution)
        res.status(200).send(solution)
    })
}

exports.rateTech = (req,res)=>{
    const id = req.params.id;
    Solution.findByIdAndUpdate(id,
        {rate:req.body.rate},
        (err,solution)=>{
        if(err){
            res.status(500).send({message:err})
            return
        }
        res.status(200).send({message:"successfully rated"})
    })
}

exports.updateProblem = (req,res)=>{
    const id = req.params.id;
    MaintenanceProplem.findByIdAndUpdate(id,
        {solved:req.body.solved},
        (err,problem)=>{
        if(err){
            res.status(500).send({message:err})
            return
        }
        res.status(200).send({message:"successfully solved"})
    })
}
