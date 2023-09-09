import React from 'react'
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import timelineImage from '../../../assets/Images/TimelineImage.png'
const TimelineSection = ({shadow}) => {
    const timeline = [
        {
            Logo:Logo1,
            heading:'Leadership',
            Description:'Fully committed to the success company',
        },
        {
            Logo:Logo2,
            heading:'Responsibility',
            Description:'Students will always be our top priority',
        },
        {
            Logo:Logo3,
            heading:'Flexibility',
            Description:'The ability to switch is an important skills',
        },
        {
            Logo:Logo4,
            heading:'Solve the problem',
            Description:'Code your way to a solution',
        }
    ]
  return (
    <div className='flex flex-row gap-20 items-center mt-[36px] relative'>
        <div className='w-[45%] flex flex-col gap-5'>
          {
            timeline.map((element,index)=>{
                return(
                    <div className='flex flex-col gap-10' key={index}>
                        <div className='flex flex-row gap-6'>
                        <div className='w-[50px] h-[50px] flex justify-center items-center bg-white rounded-full'><img src={element.Logo} alt='logo'/></div>
                        <div>
                            <div className='font-semibold font-lg leading-6 text-richblack-800'>{element.heading}</div>
                            <div className='font-sm leading-5 font-normal text-richblack-700'>{element.Description}</div>
                        </div>
                        </div>
                        {
                            index!== timeline.length-1? <div className='w-[42px] h-[1px] border border-dashed border-[#AFB2BF] transform rotate-90 mb-[15px]'></div>:null
                        }
                    </div>
                );
            })
          }
        </div>
        <div className='relative'>
          <div  className={`${shadow}`}>
            <img src={timelineImage} alt='' className='object-cover h-fit'/>
          </div>
        </div>

        <div className=' absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-10 top-[415px] left-[637px]'>
            <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7'>
                <p className='text-4xl font-bold'>10</p>
                <p className='text-caribbeangreen-400 text-sm w-[100px]'>YEARS EXPERIENCES</p>
            </div>
            <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-500 px-7'>
                <p className='text-4xl font-bold'>250</p>
                <p className='text-caribbeangreen-400 text-sm w-[100px]'>TYPES OF COURSES</p>
            </div>
        </div>

    </div>
  )
}

export default TimelineSection
