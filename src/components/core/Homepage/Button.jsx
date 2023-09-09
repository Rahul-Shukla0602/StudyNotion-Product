import React from 'react'
import { Link } from 'react-router-dom'
import './Button.css'
import {FaArrowRight} from 'react-icons/fa'
const Button = ({children,active,linkto,arrow,font,pad}) => {
  return (
    <Link to={linkto}>
        <div className={`flex justify-center items-center ${font?"font-semibold":"fontbase"}  ${arrow?"w-[200px] gap-3 px-4":"w-[150px] py-3"} text-[13px] text-center px-9 py-3 rounded-lg
        ${active? " bg-yellow-100 text-richblack-900 shadow shadow-white": " bg-[#161D29] custom-box-shadow"}
        hover:scale-95 transition-all duration-200 ${pad?'px-3':'px-1'}
        `}>
           {children}
           {
            arrow? <FaArrowRight/> : ""
           }
        </div>
    </Link>
  )
}

export default Button
