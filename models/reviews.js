const mongoose=require("mongoose");

const Review=new mongoose.Schema({
    comment:{
        type:String
    },
    reviewBy:{
        type:String
    },
    reviewFor:{
        type:String
    },
    submitted:{
        type:Boolean
    },
})
const review=mongoose.model('review',Review)
module.exports=review;