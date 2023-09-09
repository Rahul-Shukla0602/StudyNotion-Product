import React from 'react'
import ChangeProfilePicture from './ChangeProfilePicture'
import EditProfile from './EditProfile'
import UpdatePassword from './UpdatePassword'
import DeleteAccount from './DeleteAccount'

const Settings = () => {
  return (
    <div className=' overflow-y-scroll lg:w-screen h-screen'>
    <h1 className="mb-12 text-3xl font-medium text-richblack-5">Edit Profile</h1>
    <ChangeProfilePicture/>
    <EditProfile/>
    <UpdatePassword/>
    <DeleteAccount/>
    </div>   
  )
}

export default Settings
