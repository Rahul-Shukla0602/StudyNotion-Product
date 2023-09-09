import React from 'react'
import * as Icon1 from "react-icons/bi"
import * as Icon3 from "react-icons/hi2"
import * as Icon2 from "react-icons/io5"

const contactDetails = [
    {
      icon: "HiChatBubbleLeftRight",
      heading: "Chat on us",
      description: "Our friendly team is here to help.",
      details: "info@studynotion.com",
    },
    {
      icon: "BiWorld",
      heading: "Visit us",
      description: "Come and say hello at our office HQ.",
      details:
        "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
    },
    {
      icon: "IoCall",
      heading: "Call us",
      description: "Mon - Fri From 8am to 5pm",
      details: "+123 456 7869",
    },
  ]
const ContactDetail = () => {
  return (
    <div className='bg-richblack-800 rounded-2xl lg:w-[450px] lg:h-[450px] flex flex-col justify-center items-center gap-12 '>
        {
            contactDetails.map((ele,i)=>{
                let Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon]
                return(
                    <div className='flex flex-col gap-1'>
                        <div className='flex gap-2'>
                            <Icon size={25} className=' text-richblack-100'/>
                            <h1 className=' text-richblack-5'>{ele?.heading}</h1>
                        </div>
                        <p className=' lg:w-[345px] text-richblack-200'>{ele?.description}</p>
                        <p className='lg:w-[345px] text-richblack-200'>{ele?.details}</p>
                    </div>
                );
            })
        }
    </div>
  )
}

export default ContactDetail
