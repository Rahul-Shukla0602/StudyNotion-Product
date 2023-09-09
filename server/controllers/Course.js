const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');
const Section = require('../models/Section');
const SubSection = require('../models/SubSection');
const {imageUploadCloudinary} = require('../utils/imageUpload');
//create course handler function
exports.createCourse = async (req,res)=>{
    try{
        //data fetch
        let {
            courseName,
            courseDescription,
            WhatYouWillLearn,
            price,
            tag,
            category,
            status,
            instructions,
        } = req.body;
        //file get thumbnail 
        // console.log(req.body)
        // console.log(req.files);
        const thumbnailfile = req.files.thumbnailImage;
        // console.log(thumbnailfile);
        // Check if any of the required fields are missing
        if (!thumbnailfile || !thumbnailfile.tempFilePath){
            return res.status(400).json({
              success: false,
              message: "Thumbnail file missing",
            });
        }
        // const tag = JSON.parse(_tag)
        // const instructions = JSON.parse(_instructions)

        // console.log("tag", tag)
        // console.log("instructions", instructions)

        if(!courseName || !courseDescription || !price || !category || !thumbnailfile || !tag.length || !instructions.length){
            return res.status(404).json({
                success:false,
                message:"All fields are required"
            });
        }
        if (!status || status === undefined) {
			status = "Draft";
		}
        //instructor level validation
        const userId = req.user.id;
        //// Check if the user is an instructor
        const instructorDetail = await User.findById(userId,{accountType:"Instructor"});
        if(!instructorDetail){
            return res.status(404).json({
                success:false,
                message:"Instructor not found",
            });
        }
        //Category validation
        const categoryDetail = await Category.findById(category);
        if(!categoryDetail){
            return res.status(404).json({
                success:false,
                message:"category not found",
            });
        }
        //image upload in cloudinary
        const thumbnailImage = await imageUploadCloudinary(thumbnailfile,process.env.FOLDER_NAME);
        console.log(thumbnailImage);
        //create course in db
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetail._id,
            WhatYouWillLearn:WhatYouWillLearn,
            price,
            tag: tag,
            category : categoryDetail._id,
            thumbnail:thumbnailImage.secure_url,
            status: status,
			      instructions: instructions,
      })
        //add course entry in user sechma
        await User.findByIdAndUpdate(
            {_id:instructorDetail._id},
            {
                $push:{
                    courses:newCourse._id
                }
            },
            {new:true},
        );
        //updated Category schema
        await Category.findByIdAndUpdate(
            {_id:categoryDetail._id},
            {
                $push:{
                    course:newCourse._id
                }
            },
            {new:true},
        );
        // Return the new course and a success message
        return res.status(200).json({
            success:true,
            message:"New Course created",
            data:newCourse
        });
    } catch(error){
        // Handle any errors that occur during the creation of the course
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to create course",
        });
    }
}
//get course handler function
exports.getAllCourses = async (req,res)=>{
    try{
        const allCourse = await Course.find({},{
            courseName:true,
            price:true,
            thumbnail:true,
            instructor:true,
            ratingAndreviews:true,
            studentEntrolled:true
        }).populate("instructor").exec();
        return res.status(200).json({
            success:true,
            message:"data for all Course fetch",
        });
    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to get course",
        });
    }
}
//HW: getCourseDetail handler every thing should be populated
exports.getCourseDetails = async (req,res)=>{
    try{
        const {course_id} = req.body;
        if(!course_id){
            return res.status(404).json({
                success:true,
                message:"Course id is not available",
            });
        }
        const courseDetail = await Course.find({_id:course_id}).populate(
            {
                path:"instructor",
                populate:{
                    path:"additionalDetails",         
                },
            })
            .populate({
                path:"courseContent",
                populate:{
                    path:"subSection",
                    // model: "SubSection"
                }
            })
            // .populate("ratingAndreviews")
            .populate("category")
            .populate("studentEntrolled")
            .exec();
        //validation
        if(!courseDetail){
            return res.status(404).json({
                success:false,
                message:`courseDetail of ${course_id} not found`,
            });
        } 
        console.log("courseDetail: ",courseDetail)
        return res.status(200).json({
            success:true,
            message:`data for Course: ${course_id} fetch`,
            courseDetail
        });
    
    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to get course",
        });
    }
}

exports.editCourse = async (req, res) => {
    try {
      const { courseId } = req.body
      const updates = req.body
      const course = await Course.findById(courseId)
  
      if (!course) {
        return res.status(404).json({ error: "Course not found" })
      }
  
      // If Thumbnail Image is found, update it
      if (req.files) {
        console.log("thumbnail update")
        const thumbnail = req.files.thumbnailImage
        const thumbnailImage = await imageUploadCloudinary(
          thumbnail,
          process.env.FOLDER_NAME
        )
        course.thumbnail = thumbnailImage.secure_url
      }
  
      // Update only the fields that are present in the request body
      for (const key in updates) {
        if (updates.hasOwnProperty(key)) {
          if (key === "tag" || key === "instructions") {
            course[key] = JSON.parse(updates[key])
          } else {
            course[key] = updates[key]
          }
        }
      }
  
      await course.save()
  
      const updatedCourse = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("ratingAndreviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      res.json({
        success: true,
        message: "Course updated successfully",
        data: updatedCourse,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

exports.getInstructorCourses = async (req,res)=>{
    try{
        const instructorId = req.user.id
        const instructorCourses = await Course.find({
            instructor: instructorId,
        }).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: instructorCourses,
          })
    } catch(error){
        res.status(500).json({
            success: false,
            message: "Failed to retrieve instructor courses",
            error: error.message,
        })
    }
}

// Delete the Course
exports.deleteCourse = async (req, res) => {
    try {
      const { courseId } = req.body
  
      // Find the course
      const course = await Course.findById(courseId)
      if (!course) {
        return res.status(404).json({ message: "Course not found" })
      }
  
         // Unenroll students from the course
         const studentEnrolled = course.studentsEntrolled
         console.log(studentEnrolled)
         for (const studentId of studentEnrolled){
           await User.findByIdAndUpdate(studentId,{
             $pull: { courses: courseId },
           })}
         // Delete sections and sub-sections
         const courseSections = course.courseContent
         
         for (const sectionId of courseSections) {
           const section = await Section.findById(sectionId)
           if (section) {
             const subSections = section.subSection
             for (const subSectionId of subSections) {
               await SubSection.findByIdAndDelete(subSectionId)
             }
           }
     
           // Delete the section
           await Section.findByIdAndDelete(sectionId)
         }
         // Delete the course
         await Course.findByIdAndDelete(courseId)
         return res.status(200).json({
           success: true,
           message: "Course deleted successfully",
         })  
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      })
    }
  }