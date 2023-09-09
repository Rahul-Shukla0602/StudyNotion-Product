import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import {getUserEnrolledCourses} from '../../../services/operation/profileAPI'
import ProgressBar from "@ramonak/react-progress-bar";

const EntrolledCourses = () => {
    const {token} = useSelector((state)=> state.auth);

    const [enrolledCourses, setEnrolledCourses] = useState(null);

    const getEntrolledCourses = async ()=>{
        try{
            const response = await getUserEnrolledCourses(token);
            console.log("course are",response);
            setEnrolledCourses(response);
        } catch(error){
            console.log("Could not fetch enrolled courses.")
        }
    }
    useEffect(() => {
        getEntrolledCourses();
      },[])
  return (
    <div className=' text-richblack-50 w-screen'>
        <div>Entrolled Course</div>
        {
            !enrolledCourses?(<div className='w-8 h-8 border-4 border-cyan rounded-full border-b-gray-200 animate-spin' role='status'
            ></div>):
            !enrolledCourses.length?(<div>You have not entrolled in any course</div>):(
                <div>
                    <div className='lg:flex'>
                        <p>Course Name</p>
                        <p>Durations</p>
                        <p>Progress</p>
                    </div>
                    {
                        enrolledCourses.map((course,index)=>{
                            return(
                                <div className='' key={index}>
                                    <div>
                                        <img src={course.thubnail} alt=''/>
                                        <div>
                                            <p>{course.courseName}</p>
                                            <p>{course.courseDescription}</p>
                                        </div>
                                    </div>
                                    <div>{course.totalDuration}</div>
                                    <div>
                                        <p>Progress: {course.progressPercentage}</p>
                                        <ProgressBar completed={course.progressPercentage || 0}
                                            height='8px'
                                            isLabelVisible={false}
                                        />
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            )
        }
    </div>
  )
}

export default EntrolledCourses
