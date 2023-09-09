const Course = require('../models/Course');
const Section = require('../models/Section');
const SubSection = require("../models/SubSection");
// const RatingAndReviews = require('../models/RatingAndReviews')

exports.createSection = async (req,res)=>{
    try{
        // Extract the required properties from the request body
        const {sectionName,CourseId} = req.body;
        console.log(sectionName)
        console.log(CourseId)
        //  Validate the input
        console.log("BEFOREBACK HAPPY")
        if(!sectionName||!CourseId){
            return res.status(404).json({
                success:false,
                message:"Missing Property"
            });
        }
        console.log("AFTERBACK HAPPY")
        // Create a new section with the given name
        const newSection = await Section.create({sectionName});
        console.log("BEFORE HAPPY BACKEND",newSection)
        //Add the new section to the course's content array
        //HW: use populate to replace sections/sub-sections both in the updatedCourseDetails
        const updatedCourse = await Course.findByIdAndUpdate(CourseId,
            {
                $push:{
                    courseContent:newSection._id,
                }
            },
            {new:true}
        ).populate({
            path:"courseContent",
            populate:({
                path:"subSection"
            })
        }).exec();
        //return response
        return res.status(200).json({
            success:true,
            message:"Section created successfully",
            updatedCourse
        });
    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Unable to create Section, please try again",
            error:error.message,
        });
    }
}
exports.updateSection = async (req,res)=>{
    try{
        //data input
        const {sectionName, sectionId,CourseId} = req.body;
        //data validation
        if(!sectionName || !sectionId) {
            return res.status(400).json({
                success:false,
                message:'Missing Properties',
            });
        }
        //update data
        const section = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new:true});
        const course = await Course.findById(CourseId)
		.populate({
			path:"courseContent",
			populate:{
				path:"subSection",
			},
		})
		.exec();
        //return res
        return res.status(200).json({
            success:true,
            message:section,
            data:course,
        });
    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Unable to Recreate Section, please try again",
            error:error.message,
        });
    }
}
exports.deleteSection = async (req,res)=>{
    try{
        const { sectionId, CourseId }  = req.body;
		await Course.findByIdAndUpdate(CourseId, {
			$pull: {
				courseContent: sectionId,
			}
		})
		const section = await Section.findById(sectionId);
		console.log(sectionId, CourseId);
		if(!section) {
			return res.status(404).json({
				success:false,
				message:"Section not Found",
			})
		}

		//delete sub section
		await SubSection.deleteMany({_id: {$in: section.subSection}});

		await Section.findByIdAndDelete(sectionId);

		//find the updated course and return 
		const course = await Course.findById(CourseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
		.exec();

		res.status(200).json({
			success:true,
			message:"Section deleted",
			data:course
		});
    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Unable to delete Section, please try again",
            error:error.message,
        });
    }
}