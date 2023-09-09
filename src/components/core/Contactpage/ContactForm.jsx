import React from 'react'
import ContactUsForm from './ContactUsForm'
const ContactForm = () => {
  return (
    <div className='flex flex-col gap-4 border-2 border-richblack-700 rounded-3xl items-center p-10'>
        <p className=' text-richblack-5 text-3xl lg:w-[594px]'>Got a Idea? We’ve got the skills. Let’s team up</p>
        <p className=' text-richblack-200'>Tall us more about yourself and what you’re got in mind.</p>
        <ContactUsForm/>
    </div>
  )
}

export default ContactForm
