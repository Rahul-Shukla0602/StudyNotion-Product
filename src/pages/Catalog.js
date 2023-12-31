import React,{useEffect, useState} from 'react'
import CourseSlider from '../components/core/Catalog/CourseSlider'
import { useSelector } from "react-redux"
import { useParams } from 'react-router-dom'
import Footer from '../components/common/Footer'
import { getCatalogaPageData } from '../services/operation/pageAndComponent';
import { apiconnector } from '../services/apiconnector'
import { categories } from '../services/apis';
import Error from './Error.jsx'
import CourseCard from '../components/core/Catalog/Course_Card'
const Catalog = () => {
    const { loading } = useSelector((state) => state.profile)
    const { catalogName } = useParams()
    const [active, setActive] = useState(1)
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");
    useEffect(()=>{
        const getCatagory = async ()=>{
            const res = await apiconnector("GET",categories.CATEGORIES_API);
            console.log("res Before: ",res);
            const category_id = 
            res?.data?.allCategory?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
            // console.log("DEKH to: ", category_id)
            setCategoryId(category_id);
            // console.log("res after: ", category_id)
        }
        getCatagory();
    },[catalogName])

    useEffect(() => {
        const getCategoryDetails = async() => {
            try{
                const res = await getCatalogaPageData(categoryId);
                console.log("PRinting res: ", res);
                setCatalogPageData(res);
            }
            catch(error) {
                console.log(error)
            }
        }
        if(categoryId!==null){
            getCategoryDetails();
        }
    },[categoryId]);

    if (loading || !catalogPageData) {
        return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
        )
      }
      if (!loading && !catalogPageData.success) {
        return <Error/>
      }
  return (
    <div className=' text-richblack-5 overflow-y-auto h-screen'>

        <div className=" box-content bg-richblack-800 px-4">
            <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
              <p className="text-sm text-richblack-300">
                {`Home / Catalog / `}
                <span className="text-yellow-25">
                  {catalogPageData?.data?.selectedCategory?.name}
                </span>
              </p>
              <p className="text-3xl text-richblack-5">
                {catalogPageData?.data?.selectedCategory?.name}
              </p>
              <p className="max-w-[870px] text-richblack-200">
                {catalogPageData?.data?.selectedCategory?.description}
              </p>
            </div>
          </div>

          <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading">Courses to get you started</div>
            <div className="my-4 flex border-b border-b-richblack-600 text-sm">
              <p
                className={`px-4 py-2 ${
                  active === 1
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(1)}
              >
                Most Populer
              </p>
              <p
                className={`px-4 py-2 ${
                  active === 2
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(2)}
              >
                New
              </p>
            </div>
            <div>
              <CourseSlider
                Courses={catalogPageData?.data?.selectedCategory?.course}
              />
            </div>
          </div>

       {/* section2 */}
       <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading">
              Top courses in {catalogPageData?.data?.differentCategory?.name}
            </div>
            <div className="py-8">
              <CourseSlider Courses={catalogPageData?.data?.differentCategory?.course}
              />
            </div>
        </div>

      {/* section3 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading">Frequently Bought</div>
            <div className="py-8">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* {catalogPageData?.data?.mostSellingCourses
                  ?.slice(0, 4)
                  .map((course, i) => (
                    <CourseCard course={course} key={i} Height={"h-[400px]"}/>
                  ))} */}
              </div>
            </div>
          </div>

      <Footer/>

    </div>
  )
}

export default Catalog
