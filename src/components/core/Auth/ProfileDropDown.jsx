import React, { useState,useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineCaretDown } from "react-icons/ai"
import {useOnClickOutside} from '../../../hooks/useOnClickOutside'
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { Link, useNavigate } from 'react-router-dom'
import {logout} from '../../../services/operation/authApi'
const ProfileDropDown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state)=>state.profile)
  const [open,setOpen] = useState(false)
  const ref = useRef(null);
  useOnClickOutside(ref,()=>{setOpen(false)});
  if (!user) return null
  return (
    <button onClick={()=>{setOpen(true)}} className={`z-[1] relative ${open?'':''}`}>
       <div className='flex items-center gap-x-1'>
         <img src={user?.image} alt={`profile-${user?.firstName}`} className='aspect-square w-[34px] rounded-full object-cover'/>
         <AiOutlineCaretDown className="text-sm text-richblack-100"/>
       </div>
       {
        open && (
          <div className='flex flex-col text-richblack-100 absolute -left-10 top-10  divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800'
          ref={ref}
          onClick={(e) => e.stopPropagation()}
          
          >
            <Link to='/dashboard/my-profile' onClick={() => setOpen(false)}>
              <div className='flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25'>
                <VscDashboard className='text-lg text-richblack-5'/>
                <p>DashBoard</p>
              </div>
            </Link>
            <div
            className='flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25 cursor-pointer'
            onClick={() => {
              dispatch(logout(navigate))
              setOpen(false)
            }}
            >
               <VscSignOut className="text-lg" />
               <p>Logout</p>
            </div>
          </div>
        )
       }
    </button>
  )
}

export default ProfileDropDown
