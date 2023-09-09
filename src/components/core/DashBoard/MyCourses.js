import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchInstructorCourses } from '../../../services/operation/courseAPI'
import { useNavigate } from 'react-router'
import IconBtn from '../../common/IconBtn'
import CoursesTable from './instructorCourse/CoursesTable'

const MyCourses = () => {
    const {token} = useSelector((state)=> state.auth)
    const [courses,setCourse] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        const fetchCourses =async ()=>{
            const result = await await fetchInstructorCourses(token);
            if(result){
                setCourse(result);
            }
        } 
        fetchCourses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  return (
    <div className=''>
      <div className=" w-screen mb-14 flex items-center justify-around text-richblack-5">
          <p className="text-3xl font-medium ">My Course</p>
          <IconBtn text={"Add Course"} onclick={()=>{navigate('/dashboard/add-course')}}>
          </IconBtn>
      </div>
      {
        courses && <CoursesTable courses={courses} setCourse={setCourse}/>
      }
    </div>
  )
}

export default MyCourses
