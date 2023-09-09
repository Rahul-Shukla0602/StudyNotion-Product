import React, { useEffect, useState } from 'react'
import { Link, matchPath} from 'react-router-dom'
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import {NavbarLinks} from '../../data/navbar-links';
import { useLocation } from 'react-router-dom';
import {useSelector } from 'react-redux';
import {AiOutlineShopping} from 'react-icons/ai'
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiconnector } from '../../services/apiconnector';
import { categories } from '../../services/apis';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
const Navbar = () => {
    // const navigate = useNavigate();
    // const dispatch = useDispatch();
    // start code for fetching state from store of reducers
    const {token} = useSelector((state)=>state.auth)
    const {user} = useSelector((state)=>state.profile);
    const {totalItem} = useSelector((state)=>state.cart);
    // end code for fetching state from store of reducers
    const location = useLocation(); //get current url path
    //api call
    const [sublinks,setSubLinks] = useState([]);
    const fetchSubLinks = async ()=>{
      try{
        const result = await apiconnector('GET',categories.CATEGORIES_API);
        // console.log('printing sunLinks',result);
        setSubLinks(result.data.allCategory);
        // console.log('sublinks',sublinks);
      } catch(error){
         console.log(error);
         console.log('could not fetch the categories list');
      }
     }
    useEffect(()=>{
      console.log('token:',token)
      fetchSubLinks();
    },[]);

    const matchRoute = (route)=>{
        return matchPath({path:route},location.pathname);
    }
  return (
    <div className='lg:h-14 border-b-2 border-richblack-700 flex items-center justify-center relative'>
       <div className='w-11/12 max-w-maxContent flex items-center gap-x-56 absolute'>
         
         <Link to='/'>
            <img src={Logo} width={171} loading='lazy' alt=''/>
         </Link>
         
         {/* navbar */}
         <nav className=' pl-16'>
             <ul className='flex gap-x-6 text-richblack-25'>
               {
                 NavbarLinks.map((link,index)=>{
                    return(
                        <li key={index}>
                            {
                                link.title==='Catalog'?(
                                  <div className={` relative flex items-center gap-2 group cursor-pointer perspective-lg ${
                                      matchRoute("/catalog/:catalogName")
                                        ? "text-yellow-25"
                                        : "text-richblack-25"
                                    }`}>
                                    <p>{link.title}</p>
                                    <MdOutlineKeyboardArrowDown/>
                                    <div className='absolute -left-[50px] top-[40px] invisible flex flex-col rounded-md bg-richblack-5
                                     text-richblack-800 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[350px] lg:h-[160px] z-10'>
                                    {
                                        sublinks.length ? (
                                            sublinks.map((subLink, index) => (
                                              <Link key={index} to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`} className='text-richblack-800 flex flex-col justify-center ml-[20px] items-center pr-12 mt-2 z-10 '>
                                               <p>{subLink.name}</p>
                                              </Link>
                                            ))
                                        
                                        ) : (<div></div>)
                                    }
                                    </div>
                                    <div className='absolute left-[40px] top-[32px] invisible flex flex-col rounded-md bg-richblack-5 text-richblack-800 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100
                                    rotate-45 lg:w-[20px] lg:h-[20px] hover:visible z-10'>

                                    </div>
                                  </div>
                                ):(
                                    <Link to={link?.path}>
                                        <p className={`${matchRoute(link?.path)?'text-yellow-25':'text-richblack-25'}`}>
                                            {link.title}
                                        </p>
                                    </Link>
                                )
                            }
                        </li>
                    );
                 })
               }
             </ul>
         </nav>

         {/* Login/SignUp/DashBoard */}
         <div className='flex gap-x-4 items-center'>
              {
                user && user?.accountType !== 'Instructor' && (
                  <Link to='/dashboard/cart' className='relative'>
                  <AiOutlineShopping/>
                  {
                    totalItem>0 && (
                      <span>
                        {totalItem}
                      </span>
                    )
                  }
                  </Link>
                )
              }
              {
                token === null && (
                  <Link to='/login' className='text-richblack-100 border border-richblack-500 rounded-md 
                  px-[12px] py-[5px] bg-richblack-700'>
                      <button>Login</button>
                  </Link>
                )
              }
              {
                token === null && (
                  <Link to='/signup' className='text-richblack-100 border border-richblack-500 rounded-md 
                  px-[12px] py-[5px] bg-richblack-700'>
                      <button>Sign Up</button>
                  </Link>
                )
              }
              {
                token !== null && (
                     <ProfileDropDown/>
                )
              }
              
         </div>
         
       </div>
    </div>
  )
}

export default Navbar
