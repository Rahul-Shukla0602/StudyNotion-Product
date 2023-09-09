import React from 'react'
const Statitcs = [
    { count: "5K", label: "Active Students" },
    { count: "10+", label: "Mentors" },
    { count: "200+", label: "Courses" },
    { count: "50+", label: "Awards" },
  ]
const Stats = () => {
  return (
    <div className=' bg-richblack-800 flex items-center justify-center gap-56 lg:mb-[100px] lg:h-[254px]'>
       {
        Statitcs.map((element,index)=>{
            return(
                <div key={index} className='flex flex-col items-center'>
                    <p className=' text-richblack-5 text-2xl'>{element.count}</p>
                    <p className=' text-richblack-500'>{element.label}</p>
                </div>
            );
        })
       }
    </div>
  )
}

export default Stats
