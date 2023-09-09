import React from 'react'
import instructorImage from '../../../assets/Images/Instructor.png';
import HighlightText from './HighlightText';
const Instructor = () => {
  return (
    <div className='h-[725px] w-screen bg-richblack-900'>
      <div><img src={instructorImage} alt=''/></div>
      <div>
        <div>
            <div>Become an</div>
            <HighlightText text={'instructor'}/>
        </div>
      </div>
    </div>
  )
}

export default Instructor
