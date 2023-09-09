import React from 'react'
import { Link } from 'react-router-dom'
import {FaArrowRight} from 'react-icons/fa'
import HighlightText from '../components/core/Homepage/HighlightText'
import CTAButton from '../components/core/Homepage/Button'
import Banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../components/core/Homepage/CodeBlocks'
import TimelineSection from '../components/core/Homepage/TimelineSection'
import LanguageSection from '../components/core/Homepage/LanguageSection'
import instructorImage from '../assets/Images/Instructor.png';
import './Home.css';
import Footer from '../components/common/Footer'
import Exploremore from '../components/core/Homepage/Exploremore'

// import Instructor from '../components/core/Homepage/Instructor'
const Home = () => {
  return (
    <div className='overflow-y-scroll h-screen max-h-screen'>
        <div className='relative mx-auto flex flex-col item-center w-11/12 items-center text-white justify-between font-inter'>
            <Link to={'/signup'} >
            <div className='group mt-16 p-1 bg-richblack-800 rounded-full font-semibold text-richblack-200 flex item-center justify-center transition-all duration-200 hover:scale-95 shadow shadow-blue-500/90'>
                <div className='flex justify-center gap-[5px] items-center w-[335px] h-[54px] text-[18px] tracking-wide  rounded-full transition-all duration-200 group-hover:bg-richblack-900'>
                    <p>Becomes an Instructor</p>
                    <FaArrowRight/>
                </div>
            </div>
            </Link>

            <div className='mt-[42px] w-[913px] h-[44px] font-semibold text-3xl leading-10 tracking-tighter mx-auto text-center self-stretch '>
                Empower Your Future with
                <HighlightText text={"Coding Skills"}/>
            </div>

            <div className='mt-[16px] w-[913px] h-[48px] font-medium text-md leading-6 text-center text-richblack-300'>
             With our online coding courses, you can learn at your own pace, from anywhere in the world,
             and get access to a wealth of resources, including hands-on projects, quizzes, and personalized
             feedback from instructors.
            </div>

            <div className='mt-[50px] flex gap-8'>
            <CTAButton active={true} arrow={false} linkto={'/signup'}>
                Learn More
            </CTAButton>
            <CTAButton active={false} arrow={false} linkto={'/login'}>
                Book Demo
            </CTAButton>
            </div>

            <div className='bg-grad1'>
                <div className='mt-[58px] w-[1000px] h-[515px] custom-drop-shadow relative'>
                    <video
                        controls width="100%"
                        muted
                        loop
                        autoPlay
                    >
                    <source src={Banner} type='video/ogg'/>   
                    </video>
                </div>
            </div>

            <div className='mt-[180px] flex relative h-[278px]'>
                <div className=' w-[486px] font-Inter absolute -left-[490px]'>
                    <div className='w-[486px] h-[88px] text-4xl font-semibold leading-tight tracking-tight'>Unlock your 
                    <HighlightText text={"coding potential"}/> <br></br>
                    {" "}
                    with our online courses.</div>
                    <div className='mt-[10px] h-[72px] text-base font-medium leading-6 text-[#838894]'>
                    Our courses are designed and taught by industry experts who have years of 
                    experience in coding and are passionate about sharing their knowledge with you. 
                    </div>
                    <div className='mt-[70px] flex gap-8 w-[338px] h-[100px]'>
                    <CTAButton active={true} arrow={true} linkto={'/signup'}>
                        Try it Youself
                    </CTAButton>
                    <CTAButton active={false} arrow={false} linkto={'/login'}>
                        Learn More
                    </CTAButton>
                    </div>
                </div>
                <div className='border opacity-10 w-[270px] absolute -top-[3px] left-[80px]'></div>
                <div className='absolute left-[80px] bg-code p-2 border-left-gradient'><CodeBlocks background={'bg-code1'} codeblock= {`<!DOCTYPE html>\n<html>\n<head><>Example</\ntitle><link rel="stylesheet" href="styles.css">\n</head>\n<body>\n<h><a href="/">Header</a>\n</h1>\n<nav><a href="one/">One</a>\n<a href="two/">Two</a>\n<a href="three/">Three</a></nav>`}/></div>
            </div>

            <div className='mt-[200px] flex gap-[130px] relative'>
                <div className='border opacity-10 w-[270px] absolute -top-[3px]'></div>
                <div className='p-2 bg-code border-left-gradient'><CodeBlocks background={'bg-code2'} codeblock= {`<!DOCTYPE html>\n<html>\n<head><>Example</\ntitle><link rel="stylesheet" href="styles.css">\n</head>\n<body>\n<h><a href="/">Header</a>\n</h1>\n<nav><a href="one/">One</a>\n<a href="two/">Two</a>\n<a href="three/">Three</a></nav>`}/></div>

                <div className='w-[486px]'>
                    <div className='text-4xl leading-10 tracking-tight font-semibold'>
                        Start <HighlightText text={'coding'}/> <br></br>
                        <HighlightText text={'in seconds'}/>
                    </div>
                    <div className='text-[#838894] mt-[12px]'>
                        Go ahead, give it a try. Our hands-on learning environment means you'll be writing 
                        real code from your very first lesson.
                    </div>
                    <div className='mt-[70px] flex gap-8 w-[486px] h-[88px]'>
                        <CTAButton active={true} arrow={true} linkto={'/signup'}>
                            Continue Lesson
                        </CTAButton>
                        <CTAButton active={false} arrow={false} linkto={'/login'}>
                            Learn More
                        </CTAButton>
                    </div>
                </div>
            </div>
            
            {/* Unlock code section */}
            <Exploremore/>

            <div className='mt-[50px] mb-4 bg-pure-greys-5 text-richblack-700 w-screen'>
                <div className='homepage_bg h-[333px]'>
                    <div className='w-11/12 max-w-maxContent flex justify-center mx-auto item-center gap-5'>
                       <div className='mt-[150px] flex flex-row gap-7 text-white'>
                            <CTAButton linkto={'/signup'} active={true} arrow={true} font={true}>Explore Full Catalog</CTAButton>
                            <CTAButton linkto={'/singup'} active={false} arrow={false}>Learn More</CTAButton>
                       </div>
                    </div>
                </div>

                <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center gap-7 h-[921px]'>
                    {/*section1 */}
                    <div className='flex flex-row gap-10 w-11/12 mt-[90px]'>
                      {/* demand */}
                      <div className='text-4xl font-semibold w-[55%]'>
                      Get the skills you need for a <span className='text-[#00FFFF]'>job</span><HighlightText text={ 'that is in demand.'}/>
                      </div>
                      {/* button */}
                      <div className='w-[50%]'>
                        <div className='mb-[50px]'>The modern StudyNotion is the dictates its own terms. Today, to be a competitive
                         specialist requires more than professional skills.</div>
                        <CTAButton arrow={false} active={true} >Learn More</CTAButton> 
                      </div>
                    </div>
                    {/* section2 */}
                    <TimelineSection shadow={'shadow-timelineimage'}/>

                    <LanguageSection/>
                </div>

            </div>

            <div className='mt-[793px] w-11/12 h-screen mx-auto max-w-maxContent flex flex-col'>
                <div className='flex flex-row gap-[100px]'>
                    <div className='custom-drop-shadow-instructor'><img src={instructorImage} alt=''/></div>
                    <div className='flex flex-col justify-center w-[500px]'>
                        <div className='text-4xl font-semibold leading-10 tracking-tight'>Become an <br></br> <HighlightText text={'instructor'}/></div>
                        <div className='text-base font-medium leading-6 text-[#838894] mt-[12px] mb-[64px]'>Instructors from around the world teach millions of students on StudyNotion.
                        We provide the tools and skills to teach what you love.</div>
                        <CTAButton pad={false} arrow={true} active={true}>Start Teaching Today</CTAButton>
                    </div>
                </div>
                <div></div>
            </div>

            <Footer/>

            
        </div>
        
    </div>
  )
}

export default Home

