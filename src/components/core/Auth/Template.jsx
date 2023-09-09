import React from 'react'
import { useSelector } from "react-redux"
import LoginForm from './LoginForm'
import SignupForm from "./SignupForm"
import frameImg from '../../../assets/Images/frame.png'

const Template = ({ title, description1, description2, image, formType }) => {
    const {loading} = useSelector((state)=> state.auth)
  return (
    <div className=' font-inter'>
      {
        loading?(
            <div className="spinner"></div>
        ):(
            <div className='w-11/12 max-w-maxContent mx-auto flex justify-center gap-x-[140px]'>
                <div className='mx-auto mt-[92px] w-[508px] h-[804px] max-w-[440px] md:mx-0 flex flex-col gap-y-[13px]'>
                   <h1 className=' text-richblack-5 text-3xl font-semibold leading-9'>{title}</h1>
                   <p className='w-[460px] h-[50px]'>
                    <span className=' text-richblack-100 font-normal text-lg leading-6'>{description1}</span>{" "}
                    <span className='font-edu-sa text-blue-100 font-italic text-lg leading-6'>{description2}</span>
                   </p>
                   {formType==='signup'?<SignupForm/>:<LoginForm/>}
                </div>
                <div className='lg:w-[558px] h-[504px] relative mt-[100px]'>
                  <img src={frameImg} alt='' className=''/>

                  <img src={image} alt='' className=' transform translate-y-[-530px] translate-x-[-25px]'/>

                </div>
            </div>
        )
      }
    </div>
  )
}

export default Template
