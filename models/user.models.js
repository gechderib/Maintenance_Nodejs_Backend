const mongoose  = require("mongoose");

const User = mongoose.model("user",mongoose.Schema({
    fullname:{type: String,default:"Fullname"},
    username:{type: String, default:"username"},
    email:String,
    password:String,
    roles:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Role"
        }
    ],
    propList:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"MaintenanceProplem",
            
        }
    ]
}))

module.exports = User