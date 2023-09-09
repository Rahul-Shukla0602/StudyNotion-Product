import React, { useState } from 'react'
import HighlightText from './HighlightText';
import {HomePageExplore} from '../../../data/homepage-explore'
import { FaUserFriends } from 'react-icons/fa';
import {ImTree} from 'react-icons/im';
const tabName = [
    'Free',
    'New to coding',
    'Most popularr',
    'Skills paths',
    'Career paths'
]
const CourseCard = ({data,currentCard,setCurrentCard})=>{
    return(
        <div className={`bg-richblack-800 text-white lg:w-[341px] lg:h-[300px] flex flex-col p-8 z-10 
        ${currentCard===data?'bg-white':'bg-richblack-800'}
        ${currentCard===data?'drop-shadow-[12px_12px_0_rgba(255,214,1,0.85)]':'null'}`}
        onClick={()=>{setCurrentCard(data)}}
        >
        <div className={`text-xl font-semibold ${currentCard===data?'text-richblack-800':'text-richblack-25'}`}>{data.heading}</div>
        <div className='text-base text-richblack-500 mt-[12px]'>{data.description}</div>
        <div className={`flex mt-[80px] justify-between items-center border-t border-dashed text-richblack-300 pt-[10px]
        ${currentCard===data?'text-blue-500':'text-richblack-300'}
        `}>
            <div className='flex items-center gap-[9px]'>
                <FaUserFriends/>
                <div>{data.level}</div>
            </div>
            <div className='flex items-center gap-[9px]'>
                <ImTree/>
                <div>{data.lessionNumber} Lessons</div>
            </div>
        </div>
        </div>
    );
}
const Exploremore = () => {
    const [currentTab,setCurrentTab] = useState(tabName[0]);
    const [courses,setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard,setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);
    const setMyCards = (value)=>{
        setCurrentTab(value);
        console.log(currentTab);
        const result = HomePageExplore.find((course) => course.tag === value);
        if (result) {
          setCourses(result.courses);
          setCurrentCard(result.courses[0]);
        }
    }

  return (
    <div className='mt-[180px] flex flex-col items-center '>
       <div className='flex flex-col items-center'>
            <div className='text-4xl font-semibold'>Unlock the <HighlightText text={'Power of Code'}/></div>
            <div className='mt-[9px] text-[#838894]'>Learn to Build Anything You Can Imagine</div>
       </div>
       <div className='flex items-center bg-richblack-800 text-richblack-300 rounded-full gap-1 px-3 py-1 mt-[40px] text-base lg:w-[720px] shadow shadow-blue-500/90'>
            {
                tabName.map((element,index)=>{
                    return(
                        <div key={index} className={`px-6 py-2 rounded-full hover:bg-richblack-900 hover:text-richblack-5
                        ${currentTab===element?'bg-richblack-900 text-richblack-5 text-sm':'text-richblack-200'} transition-all duration-300
                        `}
                        onClick={()=>{setMyCards(element)}}
                        >
                            {element}
                        </div>
                    );
                })
            }
       </div>
       <div className='lg:h-[150px] mt-[70px]'>
           <div className='flex gap-9'>
                {
                    courses.map((element,index)=>{
                        return(
                            <CourseCard key={index}
                                data={element}
                                currentCard = {currentCard}
                                setCurrentCard = {setCurrentCard}
                            />
                        );
                    })
                }
           </div>
       </div>
    </div>
  )
}

export default Exploremore

  