import React ,{useState}from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {changePassword} from '../../../../services/operation/SettingApi'
import IconBtn from "../../../common/IconBtn"

const UpdatePassword = () => {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const {register,handleSubmit,formState:{errors}} = useForm();
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const submitPasswordForm = async (data)=>{
    try{
      await changePassword(token,data);
    } catch(error){
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <div className='lg:mb-[30px] lg:mt-[35px] lg:flex lg:flex-col lg:gap-5 lg:p-[24px] text-richblack-50 bg-richblack-800 lg:w-[820px] border-2 border-richblack-700 rounded-lg'>
      <p className=' font-semibold'>Password</p>
      <form onSubmit={handleSubmit(submitPasswordForm)} className='lg:flex lg:flex-col lg:gap-5'>
        <div className='lg:flex lg:gap-5'>
        <label className='lg:flex lg:flex-col lg:gap-2 relative'>
        <p>Current Password<sup className="text-pink-200">*</sup></p>
        <input  type={showConfirmPassword ? "text" : "password"}
         name="oldPassword"
         id="oldPassword"
        {...register("oldPassword", { required: true })}
        placeholder="Enter Current Password"
        style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
        className="w-[360px] rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
        />
         <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute z-[10] cursor-pointer left-[314px] top-[45px]"
                >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
          </span>
          {errors.oldPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Current Password.
                </span>
          )}
        </label>
        <label className='lg:flex lg:flex-col lg:gap-2 relative'>
        <p>Change Password<sup className="text-pink-200">*</sup></p>
        <input type={showNewPassword ? "text" : "password"}
        name="newPassword"
        id="newPassword"
        {...register("newPassword", { required: true })}
        placeholder="Enter New Password"
        style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
        className="w-[360px] rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"  
        />
        <span
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
        </span>
        {errors.newPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your New Password.
                </span>
        )}
        </label>
        </div>
        <div className="lg:flex lg:justify-end lg:gap-2 lg:pr-6">
          <button
            onClick={() => {
              navigate("/dashboard/my-profile")
            }}
            className="cursor-pointer rounded-md bg-richblack-700 px-5 font-semibold text-richblack-50"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Update" />
        </div>
        </form>
    </div>
  )
}

export default UpdatePassword
