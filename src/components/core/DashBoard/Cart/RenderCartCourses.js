import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { FaStar } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"
import ReactStars from "react-rating-stars-component"
import { removeFromCart } from "../../../../slices/cartSlice"

const RenderCartCourses = () => {
    const {cart} =  useSelector((state)=>state.cart)
    const dispatch = useDispatch()
  return (
    <div>
      {
        cart.map((course,index)=>{
            return(
                <div className='' key={index}>
                    <div>
                        <img src={course?.thumbnail} alt=''/>
                        <p>{course?.courseName}</p>
                        <p>{course?.category?.name}</p>
                        <div className="flex items-center gap-2">
                            <span className="text-yellow-5">4.5</span>{/* todo ---- get avg. rating api connection*/}
                                <ReactStars
                                count={5}
                                value={course?.ratingAndReviews?.length}
                                size={20}
                                edit={false}
                                activeColor="#ffd700"
                                emptyIcon={<FaStar />}
                                fullIcon={<FaStar />}
                                />
                            <span className="text-richblack-400">
                            {course?.ratingAndReviews?.length} Ratings
                            </span>
                        </div>
                        <div>
                            <button
                            onClick={()=>{dispatch(removeFromCart(course._id))}}
                            >
                                <RiDeleteBin6Line />
                                <span>Remove</span>
                            </button>
                            <p className="mb-6 text-3xl font-medium text-yellow-100">
                                ₹ {course?.price}
                            </p>
                        </div>
                    </div>

                </div>
            )
        })
      }
    </div>
  )
}

export default RenderCartCourses
