import React from 'react'
import ContactDetail from '../components/core/Contactpage/ContactDetail'
import ContactForm from '../components/core/Contactpage/ContactForm'
import Footer from '../components/common/Footer'
const Contact = () => {
  return (
    <div className='overflow-y-scroll h-screen max-h-screen lg:mt-[100px]'>
        <div className='flex justify-center gap-16 lg:mb-[100px]'>
            <div><ContactDetail/></div>
            <div><ContactForm/></div>
        </div>
        {/* review slider */}
        
        <Footer/>
    </div>
  )
}

export default Contact
