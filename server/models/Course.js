const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseName:{
        type:String,
        trim:true,
        required:true,
    },
    courseDescription :{
        type:String,
        trim:true,
        required:true,
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    WhatYouWillLearn:{
        type:String,
    },
    courseContent:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Section',
        required:true,
        }
    ],
    ratingAndreviews :[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:'RatingAndReviews',
        required:true,
        }
    ],
    price:{
        type:Number,
        required:true,
    },
    thumbnail:{
        type:String,
        required:true,
    },
    tag:{
        type:[String],
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true,
    },
    studentsEntrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    }],
    instructions:{
        type:[String],
        require:true
    },
    status:{
        type:String,
        enum:["Draft",'Published'],
    }
});

module.exports = mongoose.model("Course",courseSchema);