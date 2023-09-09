import React from 'react'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import IconBtn from '../../../common/IconBtn'
import {updateProfile} from '../../../../services/operation/SettingApi'
const genders = ["Male", "Female",'Other']


const EditProfile = () => {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,handleSubmit,formState: { errors },
  } = useForm();

  const submitProfileForm = async (data)=>{
    console.log("Form Data - ", data);
    try{
      dispatch(updateProfile(token,data));
    } catch(error){
        console.log("ERROR MESSAGE - ", error.message)
    }
  }
  
  return (
    <form onSubmit={handleSubmit(submitProfileForm)}
     className='lg:flex lg:flex-col lg:gap-4 text-richblack-5 bg-richblack-800 lg:w-[820px] lg:mt-[30px] lg:p-[24px] rounded-lg border-2 border-richblack-700'>

        <p>Profile Information</p>

        <div className='lg:flex lg:gap-6'>
          <label className=' lg:flex lg:flex-col lg:gap-2'>
            <p>First Name</p>
            <input type='text'
            name="firstName"
            id="firstName"
            placeholder="Enter first name"
            {...register("firstName", { required: true })}
            defaultValue={user?.firstName}
            style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
              className="w-[360px] rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
            />
            {errors.firstName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your first name.
                </span>
            )}
            <p className='text-richblack-500 text-sm'>Name entered above will be used for all issued certifies.</p>
          </label>

          <label className=' lg:flex lg:flex-col lg:gap-2'>
            <p>Last Name</p>
            <input type='text'
            name="lastName"
            id="lastName"
            placeholder="Enter last name"
            {...register("lastName", { required: true })}
            defaultValue={user?.lastName}
            style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-[360px] rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
            />
            {errors.lastName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your last name.
                </span>
            )}
          </label>
        </div>

        <div className=' lg:flex lg:gap-6'>

          <label className=' lg:flex lg:flex-col lg:gap-2'>
            <p>Date of Birth <sup className="text-pink-200">*</sup></p>
            <input type='date'
            name="dateOfBirth"
            id="dateOfBirth"
            {...register("dateOfBirth", {
                  required: {
                    value: true,
                    message: "Please enter your Date of Birth.",
                  },
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future.",
                  },
            })}
            defaultValue={user?.additionalDetails?.dateOfBirth}
            style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-[360px] rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-100"  
            />
            {errors.dateOfBirth && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.dateOfBirth.message}
                </span>
            )}
          </label>

          <label className=' lg:flex lg:flex-col lg:gap-2'>
            <p>Gender<sup className="text-pink-200">*</sup></p>
            <select
            type='text'
            name="gender"
            id="gender"
            {...register("gender", { required: true })}
            defaultValue={user?.additionalDetails?.gender}
            style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-[360px] rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-200"  
            >
            {genders.map((ele,i)=>{
              return(
                <option key={i}>
                {ele}
                </option>
              )
            }
            )}
            </select>
            {errors.gender && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Date of Birth.
                </span>
            )}
          </label>
        </div>

        <div className='flex gap-6'>
          <label className=' lg:flex lg:flex-col lg:gap-2'>
            <p>Contact Number <sup className="text-pink-200">*</sup></p>
            <input type='tel'
            name="contactNumber"
            id="contactNumber"
            placeholder="Enter Contact Number"
            {...register("contactNumber", {
                  required: {
                    value: true,
                    message: "Please enter your Contact Number.",
                  },
                  maxLength: { value: 12, message: "Invalid Contact Number" },
                  minLength: { value: 10, message: "Invalid Contact Number" },
            })}
            defaultValue={user?.additionalDetails?.contactNumber}
            style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-[360px] rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"      
            />
            {errors.contactNumber && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.contactNumber.message}
                </span>
            )}
          </label>

          <label className=' lg:flex lg:flex-col lg:gap-2'>
            <p>About</p>
            <input type='text'
            name="about"
            id="about"
            placeholder="Enter Bio Details"
            {...register("about", { required: true })}
            defaultValue={user?.additionalDetails?.about}
            style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-[360px] rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"    
            />
            {errors.about && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your About.
                </span>
            )}
          </label>
        </div>
        <div className="lg:flex lg:justify-end lg:pr-8 lg:pt-5 lg:gap-2">
            <button
            onClick={() => {
              navigate("/dashboard/my-profile")
            }}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
            >Cancle
            </button>
            <IconBtn text='Save' type='submit'/>
        </div>
    </form>
  )
}

export default EditProfile
