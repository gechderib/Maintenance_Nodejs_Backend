const mongoose  = require("mongoose");


const MaintenanceProplem = mongoose.model("Proplems",mongoose.Schema({
    workField:{type:String},
    directorateWorkflowName:{type:String},
    officeName:{type:String},
    officeNumber:{type:Number},
    time:{type:Date,default:Date.now},
    sysUsername:{type:String},
    sex:{type:String},
    isUserDisabled:{type:String},
    itemType:[{type:String}],
    sysType:[{type:String}],
    reportedProblem:{type:String},
    assignedTech:{type:String,default:"not assign yet"},
    solution:{type:mongoose.Schema.Types.ObjectId,ref:"Solution",default:null},
    postedBy:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    solved:{type:Boolean,default:false}

}))

module.exports = MaintenanceProplem

