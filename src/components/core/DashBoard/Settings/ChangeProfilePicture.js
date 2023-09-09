import React, { useState,useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FiUpload } from "react-icons/fi"
import IconBtn from '../../../common/IconBtn'
import { updateDisplayPicture } from '../../../../services/operation/SettingApi';
const ChangeProfilePicture = () => {
    const dispath = useDispatch();
    const { user } = useSelector((state) => state.profile)
    const {token} = useSelector((state)=>state.auth)
    const [previewSource, setPreviewSource] = useState(null)
    const [imageFile, setImageFile] = useState(null)
    const [loading,setLoading] = useState(false);
    const fileInputRef = useRef(null);

    //trigger action input file
    const handleClick = ()=>{
      fileInputRef.current.click();
    }

    // 
    const handleFilechange = (e)=>{
      const file = e.target.files[0];
      console.log(file);
      if(file){
        setImageFile(file);
        PreviewFile(file);
      }
    }

    const PreviewFile = (file)=>{
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = ()=>{
        setPreviewSource(reader.result);
      }
    }

    const handleFileUpload = ()=>{
      try{
        console.log("uploading...")
        setLoading(true);
        const formdata = new FormData();
        formdata.append('displayPicture',imageFile);
        console.log(formdata);
        dispath(updateDisplayPicture(token,formdata)).then(()=>{
          setLoading(false);
        })
      } catch(error){
        console.log("ERROR MESSAGE - ", error.message)
      }
    }
    useEffect(()=>{
      if(imageFile){
        PreviewFile(imageFile);
      }
    },[imageFile])
  return (
    <div>
      <div className='flex lg:gap-16 lg:pl-[50px] bg-richblack-800  items-center lg:w-[820px] lg:h-[126px] border-2 border-richblack-600 rounded-lg'>
        <img
            src={previewSource || user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
        />
        <div className='flex lg:flex-col lg:gap-5'>
            <p className='text-richblack-25'>Change Profile Picture</p>
            <div className='flex gap-4'>
                <input 
                type='file'
                className='hidden'  
                ref={fileInputRef}
                onChange={handleFilechange}
                accept='image/png, image/gif, image/jpeg'
                />
                <button
                className="cursor-pointer rounded-md border-2 border-richblack-600 bg-richblack-700 py-2 px-5 font-medium text-richblack-50"
                onClick={handleClick}
                disabled={loading}
                >Select</button>
                <IconBtn 
                text={loading?'Uploaing...':'Upload'}
                onclick={handleFileUpload}>
                {!loading && (<FiUpload className='text-lg text-white'/>)}
                </IconBtn>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ChangeProfilePicture
