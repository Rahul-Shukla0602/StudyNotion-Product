import React, { useState } from 'react'
import Tab from '../../common/Tab'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import {ACCOUNT_TYPE} from '../../../utils/constant'
import { Link, useNavigate } from 'react-router-dom'
import {login} from '../../../services/operation/authApi'
import { useDispatch } from 'react-redux'
const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false)
  const [accountType,setAccountType] = useState(ACCOUNT_TYPE.STUDENT);//accountType
    const [formData,setFormData] = useState({
        email: "",
        password: "",
      });
    const {email,password} = formData;
    const handleOnChange = (e)=>{
        e.preventDefault();
        setFormData((PrevData)=>({
          ...PrevData,
          [e.target.name]:e.target.value
        }));
    }
    const tabData = [
      {
        id: 1,
        tabName: "Student",
        type: ACCOUNT_TYPE.STUDENT,
      },
      {
        id: 2,
        tabName: "Instructor",
        type: ACCOUNT_TYPE.INSTRUCTOR,
      },
    ]
    const handleOnSubmit = (e)=>{
      e.preventDefault();
      dispatch(login(email,password,navigate))
    }
  return (
    <div>
    <Tab tabData={tabData} field={accountType} setField={setAccountType} />
    <form className='flex flex-col gap-6' onSubmit={handleOnSubmit}>
        <label className='flex flex-col gap-2'>
            <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>Email Address<sup className="text-pink-200">*</sup></p>
            <input
                required
                type='email'
                name='email'
                onChange={handleOnChange}
                placeholder='Enter email address'
                value={email}
                style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
            />
        </label>

        <label className='flex flex-col gap-2 relative'>
            <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>Password<sup className="text-pink-200">*</sup></p>
            <input
                required
                type={showPassword ? "text" : "password"}
                name='password'
                onChange={handleOnChange}
                placeholder='Enter Password'
                value={password}
                style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
            />
            <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute z-[10] cursor-pointer left-[390px] top-[45px]"
            >
            {showPassword ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
            )}
          </span>
          <Link to="/forgot-password">
          <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
            Forgot Password
          </p>
        </Link>
        </label>

        <button
        type='submit'
        className=' bg-yellow-100 rounded-xl py-3 mt-1'
        >
            Sign in
        </button>
    </form>
    </div>
  )
}

export default LoginForm
