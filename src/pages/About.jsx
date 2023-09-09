import React from 'react'
import HighlightText from '../components/core/Homepage/HighlightText'
import aboutus1 from '../assets/Images/aboutus1.webp';
import aboutus2 from '../assets/Images/aboutus2.webp';
import aboutus3 from '../assets/Images/aboutus3.webp';
import FoundingStory from '../assets/Images/FoundingStory.png'
import Stats from '../components/core/AboutPage/Stats'
import Footer from '../components/common/Footer'
import './About.css'
import LearingGrid from '../components/core/AboutPage/LearingGrid';
import ContactForm from '../components/core/AboutPage/ContactForm';
const About = () => {
  return (
    <div className='overflow-y-scroll h-screen max-h-screen'>

    <div className='bg-richblack-800 lg:pt-[150px] h-[618px] flex flex-col justify-center items-center'>
        <p className=' text-richblack-200 lg:mb-[60px]'>About us</p>
        <p className='lg:w-[800px] lg:text-4xl lg:mb-[16px] text-richblack-5 flex flex-col items-center'>
        <p className='text-richblack-5'>Driving Innovation in Online Education for a</p>
        <span><HighlightText text={'Brighter Future'}/></span>
        </p>
        <p className='lg:w-[809px] lg:mb-[52px] lg:text-base text-richblack-300 flex flex-col items-center'>
        <p>Studynotion is at the forefront of driving innovation in online education.
        We're passionate about creating a brighter future by offering cutting-edge courses,
        leveraging emerging technologies, and nurturing a</p>
        <p>vibrant learning community.</p>
        </p>
        <div className='flex gap-[24px]'>
        <img src={aboutus1} alt=''/>
        <img src={aboutus2} alt=''/>
        <img src={aboutus3} alt=''/>
        </div>
    </div>

    <div className='lg:mt-[150px] mb-[250px]  text-3xl font-semibold leading-8 flex flex-col justify-center items-center gap-4'>
        <p className=' text-richblack-100'>We are passionate about revolutionizing the way we learn. Our</p>
        <p className=' text-richblack-100'>innovative platform <HighlightText text={'combines technology'}/>, 
        <span
        style={{
        background: 'linear-gradient(117.83deg, #FF512F -4.8%, #F09819 107.46%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textFillColor: 'transparent' 
        }}
        >expertise</span>
        , and community to</p>
        <p className=' text-richblack-100'>create an 
        <span
        style={{
        background: 'linear-gradient(118.41deg, #E65C00 -6.05%, #F9D423 106.11%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textFillColor: 'transparent' 
        }}
        > unparalleled educational experience.</span></p>
    </div>

    <div className=' flex mt-[200px] w-[1200px] mx-auto items-center lg:pl-[100px] gap-28'>
    <div className='flex flex-col gap-5'>
        <p
        style={{
            background: 'linear-gradient(117.95deg, #833AB4 -2.4%, #FD1D1D 52.25%, #FCB045 106.89%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textFillColor: 'transparent' 
        }}
        className=' text-3xl font-semibold'
        >Our Founding Story </p>
        <p  className='lg:w-[486px] lg:h-[120px] text-richblack-100'>Our e-learning platform was born out of a shared vision and passion for transforming 
        education. It all began with a group of educators, technologists, and lifelong learners 
        who recognized the need for accessible, flexible, and high-quality learning opportunities
        in a rapidly evolving digital world.</p>
        <p  className='lg:w-[486px] lg:h-[120px] text-richblack-100 lg:-mt-[10px]'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges
        of traditional education systems. We believed that education should not be confined to the
        walls of a classroom or restricted by geographical boundaries. We envisioned a platform that
        could bridge these gaps and empower individuals from all walks of life to unlock their full
        potential.</p>
    </div>
    <div>
        <div className='shadow-img'>
        <img src={FoundingStory} alt=''/>
        </div>
    </div>
    </div>

    <div className='lg:pt-[280px] lg:pl-[50px] flex justify-center items-center gap-24 lg:h-[210px] lg:pb-[200px]'>
        <div className='flex flex-col gap-5'>
           <p
           style={{
            background: 'linear-gradient(117.83deg, #FF512F -4.8%, #F09819 107.46%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textFillColor: 'transparent' 
            }}
            className=' text-3xl'
           >Our Vision</p>
           <p className=' text-richblack-300 lg:w-[486px] lg:h-[144px]'>With this vision in mind, we set out on a journey to create an e-learning platform that
            would revolutionize the way people learn. Our team of dedicated experts worked tirelessly
            to develop a robust and intuitive platform that combines cutting-edge technology with 
            engaging content, fostering a dynamic and interactive learning experience.</p>
        </div>
        <div className='flex flex-col gap-5'>
           <p className=' text-3xl'><HighlightText text={'Our Mission'}/></p>
           <p  className=' text-richblack-300 lg:w-[486px] lg:h-[144px]'>our mission goes beyond just delivering courses online. We wanted to create a vibrant
            community of learners, where individuals can connect, collaborate, and learn from one
            another. We believe that knowledge thrives in an environment of sharing and dialogue,
            and we foster this spirit of collaboration through forums, live sessions, and networking
            opportunities.</p>
        </div>
    </div>

    <Stats/>

    <div className='lg:ml-[250px] lg:mr-[250px]'><LearingGrid/></div>

    <div className='flex justify-center lg:mt-[200px] lg:mb-[100px]'><ContactForm/></div>

    <Footer/>

    </div>
  )
}

export default About









