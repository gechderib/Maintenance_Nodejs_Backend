const mongoose = require("mongoose")

const Solution = mongoose.model("solution",mongoose.Schema({
    brand:{type:String},
    model:{type:String},
    problemFaced:{type:String},
    problemSoln:{type:String},
    timeStarted:{type:String},
    timeEnded:{type:String},
    isFixed:{type:String},
    problemDescription:{type:String},
    coordinator:{type:String},
    rate:{type:String,default:"Not Rated"},
    ratedBy:{type:String,default:"Not yet rated"},
    questionOwnerId:{type:String},
    solvedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
}))

module.exports = Solution