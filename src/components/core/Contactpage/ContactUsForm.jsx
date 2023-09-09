import React,{useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {apiconnector} from '../../../services/apiconnector.js'
import countrycode from '../../../data/countrycode.json'
import {contactusEndpoint} from '../../../services/apis.js'
const ContactUsForm = () => {
    const [loading,setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors ,isSubmitSuccessful},
      } = useForm();
    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                email: "",
                firstname: "",
                lastname: "",
                message: "",
                PhoneNo: "",
            })
        }
    },[reset,isSubmitSuccessful])
    const submitContactForm = async(data)=>{
        console.log('FORM_DATA: ',data);
        setLoading(true)
        try{
            const res = await apiconnector("POST",contactusEndpoint.CONTACT_US_API,data);
            console.log('Email-res: ',res);
            setLoading(false);
        } catch(error){
            console.log("ERROR MESSAGE - ", error.message)
            setLoading(false)
        }
    }
  return (
    <div>
      <form onSubmit={handleSubmit(submitContactForm)} className=' flex flex-col gap-y-4 lg:w-[536px]'>

        <div className='flex gap-x-5'>
        {/* first and last name */}
        <label htmlFor='firstname' className='flex flex-col gap-2'>
            <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>First Name</p>
            <input
            type='text'
            name='firstname'
            id="firstname"
            placeholder='Enter first name'
            style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            {...register('firstname',{required:true})}
            className="w-[258px] rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
            {errors.firstname && (
            <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter your firstname.
            </span>
            )}
        </label>
        <label htmlFor='lastname' className='flex flex-col gap-2'>
            <p  className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>last Name</p>
            <input
            type='text'
            name='lastname'
            id="lastname"
            placeholder='Enter last name'
            style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            {...register('lastname',{required:true})}
            className="w-[258px] rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
            {errors.lastname && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                    Please enter last Name
                </span>
            )}
        </label>
        {/* first and last name */}
        </div>

        {/* email */}
        <label htmlFor='email' className='flex flex-col gap-2'>
            <p  className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>Email Address</p>
            <input
            type='email'
            name='email'
            id="email"
            placeholder='Enter email address'
            style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            {...register('email',{required:true})}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
            {errors.email && (
            <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter your Email address.
            </span>
            )}
        </label>
        {/* phone number component baad mai daal dunga */}
           <div className='flex flex-col gap-4'>
            <label htmlFor="phoneNo" className="lable-style">
            Phone Number
            </label>
           
           <div className='flex gap-5'>
            <div className="flex w-[101px] flex-col gap-2 rounded-[0.5rem] bg-richblack-800 p-[16px] text-richblack-5"
            style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            >
               <select 
               className='bg-richblack-800  text-richblack-200 text-xl'
               {...register("countrycode", { required: true })}
               >
               {
                countrycode.map((ele,i)=>{
                    return(
                        <option key={i} value={ele.code}>
                        {ele.code} -{ele.country}
                        </option>
                    )
                })
               }
               </select>
            </div>
            <div>
                <input
                type='number'
                name="phoneNo"
                id="phoneNo"
                placeholder='12345 67890'
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                {...register('PhoneNo',{
                    required:{
                        value:true,
                        message: "Please enter your Phone Number.",
                    },
                    maxLength: { value: 12, message: "Invalid Phone Number" },
                    minLength: { value: 10, message: "Invalid Phone Number" },
                    })}
                className="lg:w-[415px] rounded-[0.5rem] bg-richblack-800 lg:p-[16px] text-richblack-5"/>
            </div>
           </div>
           {errors.phoneNo && (
            <span className="-mt-1 text-[12px] text-yellow-100">
                {errors.phoneNo.message}
            </span>
        )}
           </div>
        {/* <PhoneNumberInput/> */}
        
        <label className='flex flex-col gap-2'>
            <p  className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>Message</p>
            <textarea
            name="message"
            id="message"
            cols="30"
            rows="7"
            placeholder="Enter your message here"
            style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            {...register('message',{required:true})}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 h-[120px]"
            />
            {errors.message && (
            <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter your Message.
            </span>
            )}
        </label>

        <button
        type='submit'
        disabled={loading}
        className={`bg-yellow-100 rounded-xl py-3 mt-2 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)
        ${
            !loading&&'transition-all duration-200 hover:scale-95 hover:shadow-none'
        } disabled:bg-richblack-500 sm:text-[16px] 
        `}
        >
            Send Message
        </button>

        </form>
        </div>
  )
}

export default ContactUsForm
