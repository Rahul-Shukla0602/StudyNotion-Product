import React from 'react'
import ContactUsForm from '../Contactpage/ContactUsForm'
const ContactForm = () => {
  return (
    <div>
      <div className="mx-auto">
      <h1 className="text-center text-4xl font-semibold text-richblack-5">Get in Touch</h1>
      <p className="text-center text-richblack-300 mt-3">
        We&apos;d love to here for you, Please fill out this form.
      </p>
      <div className="mt-12 mx-auto">
        <ContactUsForm />
      </div>
    </div>

    </div>
  )
}

export default ContactForm
