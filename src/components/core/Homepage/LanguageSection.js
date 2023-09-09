import React from 'react'
import HighlightText from './HighlightText'
import progressImage from '../../../assets/Images/Know_your_progress.png';
import planLessonImage from '../../../assets/Images/Plan_your_lessons.png';
import compare from '../../../assets/Images/Compare_with_others.png';
import CTAbutton from './Button.jsx'
const LanguageSection = () => {
  return (
    <div className='mt-[120px] bg-[#F9F9F9] w-screen flex flex-col justify-center items-center'>
         <div className='flex flex-col justify-center items-center gap-[12px]'>
            <div className='text-4xl font-bold'>Your swiss knife for <HighlightText text={'learning any language'}/></div>
            <div className='text-base w-[850px] text-[#2C333F] flex flex-col items-center'>
            <div>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over,</div>
            <div>progress tracking, custom schedule and more.</div>
            </div>
         </div>
         <div className='mt-[40px] flex flex-row -gap-12'>
            <div className='w-[361px] h-[350px] object-contain '><img src={progressImage} alt=''/></div>
            <div className='w-[361px] h-[350px] object-contain -ml-[100px]'><img src={compare} alt=''/></div>
            <div className='w-[361px] h-[350px] object-contain -ml-[110px]'><img src={planLessonImage} alt=''/></div>
         </div>

         <div className='mt-[100px] mb-[90px]'><CTAbutton arrow={false} active={true}>Learn More</CTAbutton></div>
    </div>
  )
}

export default LanguageSection
