const mongoose=require("mongoose");

const Employee=new mongoose.Schema({
    EID:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    FullName:{
        type:String,
        required:true
    },
    Designation:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        required:true
    },
    isReviewSubmitted:{
        type:Boolean,
        required:true
    },
    isReviewerAssigned:{
        type:Boolean,
        required:true
    },
    ReviewedBy:{
        type:String,
        required:true
    },
    Review:{
        type:String,
        required:true
    }
})
const employee=mongoose.model('Employee',Employee)
module.exports=employee;