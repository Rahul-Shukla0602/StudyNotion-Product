const { default: mongoose } = require('mongoose');
const Course = require('../models/Course');
const RatingAndReviews = require('../models/RatingAndReviews')

//createRating
exports.createRating = async (req,res)=>{
    try{
        //get userid, courseid
        const userID = req.user.id;
        //fetch data of rating
        const {course_id,rating,review} = req.body;
        //check is user existence
        const courseDetail = await Course.findById(
            {_id:course_id,
                studentEntrolled:{$elemMatch:{$eq:userID}}
            }
        );
        if(!courseDetail){
            return res.status(404).json({
                success:false,
                message:"Student is not entrolled in course",
            });
        }
        //check is user already given review
        const alreayReview = await RatingAndReviews.findById({user:userID,course:course_id});
        if(alreayReview){
            return res.status(403).json({
                success:false,
                message:"Course is alreay review",
            });
        }
        //create rating
        const ratingReviews = await RatingAndReviews.create({rating,review,course:course_id,user:userID});
        //updated course
        const updatedCourseRatingRview = await Course.findByIdAndUpdate({_id:course_id},
            {
                $push:{
                    ratingAndreviews:ratingReviews._id
                }
            },
            {new:true}
            )
            console.log("updatedCourseRatingRview",updatedCourseRatingRview)
        //return response
        return res.status(200).json({
            success:true,
            message:"course rating and review created successfully",
        });
    } catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

//getAverage Rating
exports.getAverageRating = async (req,res)=>{
    try{
        const course_id = req.body.course_id;
        const result = await RatingAndReviews.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(course_id),
                }
            },
            {
                $group:{
                    _id:null,
                    averageRating : {$avg:"rating"}
                }
            }
        ]);
        if(result.length>0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating,
                message:"rating send successfully",
            });
        } 
            return res.status(200).json({
                success:true,
                averageRating:0,
                message:"rating is 0,please give rating",
            });
    } catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

//get All Rating
exports.getAllRating = async (req,res)=>{
    try{
        const allReview = await RatingAndReviews.find({}).sort({rating:"desc"})
                                                         .populate({
                                                            path:"user",
                                                            select:"firstName lastName email image",
                                                         })
                                                         .populate({
                                                            path:"course",
                                                            select:"courseName"
                                                         })
                                                         .exec();
        
            return res.status(200).json({
                success:true,
                message:"all reviews fetch successfully",
            });
    } catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}
//course_id ke corresponding rating fetch