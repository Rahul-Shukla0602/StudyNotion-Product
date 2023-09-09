import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import IconBtn from '../../../common/IconBtn'
// import { buyCourse } from "../../../../services/operations/studentFeaturesAPI"

const RenderTotalAmount = () => {
    const {total,cart} =  useSelector((state)=>state.cart)
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleBuyCourse = ()=>{
        const courses = cart.map((course) => course._id)
        console.log("Buy These Course: ",courses);
        // TODO--- payment integration
        // buyCourse(token, courses, user, navigate, dispatch)
    }
  return (
    <div>
      <p>Total:</p>
      <p>Rs: {total} </p>
      <IconBtn text='Buy Now' onclick={handleBuyCourse}/>
    </div>
  )
}

export default RenderTotalAmount
