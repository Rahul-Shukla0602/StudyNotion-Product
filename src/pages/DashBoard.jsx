import React from 'react'
import { useSelector } from 'react-redux'
import Slider from '../components/core/DashBoard/Slider'
import { Outlet } from 'react-router-dom';
const DashBoard = () => {
    const {loading:authLoading } = useSelector((state)=>state.auth);
    const {loading:profileLoading } = useSelector((state)=>state.profile);

    if(profileLoading || authLoading ){
        return (
            <div className='w-full h-full flex justify-center items-center'>
                <div className='w-8 h-8 border-4 border-cyan rounded-full border-b-gray-200
                animate-spin' role='status'>
                </div>
                <span className='ml-4'>Loading...</span>
            </div>
        );
    }
  return (
    <div className='flex min-h-[calc(100vh-3rem)] bg-richblack-900'>
        <Slider/>
        <div className='h-[calc(100vh-3.5rem)]'>
            <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
                <Outlet/>
            </div>
        </div>
      
    </div>
  )
}

export default DashBoard
