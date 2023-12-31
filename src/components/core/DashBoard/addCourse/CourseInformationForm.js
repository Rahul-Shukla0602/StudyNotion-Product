import React,{useEffect, useState} from 'react'
import { useForm } from 'react-hook-form'
import { toast } from "react-hot-toast"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
import { fetchCourseCategories } from '../../../../services/operation/courseAPI'
import ChipInput from './ChipInput'
import Upload from './Upload'
import RequirementsField from './RequirementsField'
import IconBtn from '../../../common/IconBtn'
import { setCourse, setStep } from '../../../../slices/courseSlice'
import { MdNavigateNext } from "react-icons/md"
import { editCourseDetails } from '../../../../services/operation/courseAPI'
import { addCourseDetails } from '../../../../services/operation/courseAPI'
const CourseInformationForm = () => {
    const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    } = useForm()
    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.auth)
    const { course, editCourse } = useSelector((state) => state.course)
    const [loading, setLoading] = useState(false)
    const [courseCategories, setCourseCategories] = useState([])

    useEffect(()=>{
        const getCategories = async ()=>{
            setLoading(true);
            const categories = await fetchCourseCategories()
            // console.log("categories: ",categories);
            if (categories.length > 0) {
                // console.log("categories", categories)
                setCourseCategories(categories)
            }
            setLoading(false)
        }
        if(editCourse){
            // console.log("data populated", editCourse)
            setValue("courseTitle", course.courseName)
            setValue("courseShortDesc", course.courseDescription)
            setValue("coursePrice", course.price)
            setValue("courseTags", course.tag)
            setValue("courseBenefits", course.whatYouWillLearn)
            setValue("courseCategory", course.category)
            setValue("courseRequirements", course.instructions)
            setValue("courseImage", course.thumbnail)
        }
        getCategories()
    },[])

    const isFormUpdated = () => {
        const currentValues = getValues()
        // console.log("changes after editing form values:", currentValues)
        if (
            currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory._id !== course.category._id ||
            currentValues.courseRequirements.toString() !==
            course.instructions.toString() ||
            currentValues.courseImage !== course.thumbnail
        )
            return true
        else
            return false
        }

    //   handle next button click
  const onSubmit = async (data) => {
    // console.log(data)
    if (editCourse) {
      // const currentValues = getValues()
      // console.log("changes after editing form values:", currentValues)
      // console.log("now course:", course)
      // console.log("Has Form Changed:", isFormUpdated())
      if (isFormUpdated()) {
        const currentValues = getValues()
        const formData = new FormData()
        // console.log(data)
        formData.append("CourseId", course._id)
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle)
        }
        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc)
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice)
        }
        if (currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.courseTags))
        }
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits)
        }
        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory)
        }
        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          )
        }
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage)
        }
        // console.log("Edit Form data: ", formData)
        setLoading(true)
        const result = await editCourseDetails(formData, token)
        setLoading(false)
        if (result) {
          dispatch(setStep(2))
          dispatch(setCourse(result))
        }
      } else {
        toast.error("No changes made to the form")
      }
      return
    }
    const formData = new FormData()
    formData.append("courseName", data.courseTitle)
    formData.append("courseDescription", data.courseShortDesc)
    formData.append("price", data.coursePrice)
    formData.append("tag", JSON.stringify(data.courseTags))
    formData.append("whatYouWillLearn", data.courseBenefits)
    formData.append("category", data.courseCategory)
    // formData.append("status", COURSE_STATUS.DRAFT)
    formData.append("instructions", JSON.stringify(data.courseRequirements))
    formData.append("thumbnailImage", data.courseImage)
    setLoading(true)
    
    const result = await addCourseDetails(formData, token)
    if (result) {
      dispatch(setStep(2))
      dispatch(setCourse(result))
    }
    setLoading(false)
    console.log("formData: ",formData)
  }

  return (
        <form
        onSubmit={handleSubmit(onSubmit)}
        className='mb-[200px] flex flex-col justify-center gap-10 transform translate-x-[-40px] text-richblack-5 lg:w-[600px]
        bg-richblack-800 border-2 border-richblack-500 rounded-lg p-[24px] first-letter first-letter lg:mr-[35px]'>
            <label className='flex flex-col gap-4' htmlFor="courseTitle">
                <p>Course Title<sup className="text-pink-200">*</sup></p>
                <input
                    type='text'
                    className="form-style w-full"
                    id="courseTitle"
                    placeholder="Enter Course Title"
                    {...register("courseTitle", { required: true })}
                />
                {errors.courseTitle && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    Course title is required
                </span>
                )}
            </label>

            <label className='flex flex-col gap-4' htmlFor="courseShortDesc">
                <p>Course Short Description<sup className="text-pink-200">*</sup></p>
                <textarea
                    id="courseShortDesc"
                    placeholder="Enter Description"
                    {...register("courseShortDesc", { required: true })}
                    className="form-style resize-x-none min-h-[135px] w-full"
                />
                {errors.courseShortDesc && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    Course Description is required
                </span>
                )}
            </label>

            <label className='flex flex-col gap-4 relative'  htmlFor="coursePrice">
                <p>Course Price<sup className="text-pink-200">*</sup></p>
                <input
                    type='text'
                    id="coursePrice"
                    placeholder="Enter Course Price"
                    {...register("coursePrice", {
                    required: true,
                    valueAsNumber: true,
                    pattern: {
                        value: /^(0|[1-9]\d*)(\.\d+)?$/,
                    },
                    })}
                    className="form-style w-full !pl-12"
                />
                <HiOutlineCurrencyRupee className="absolute left-3 top-16 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
                {errors.coursePrice && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    Course Price is required
                </span>
                )}
            </label>

            <label className='flex flex-col gap-4' htmlFor="courseCategory">
                <p>Course Category<sup className="text-pink-200">*</sup></p>
                <select
                {...register("courseCategory", { required: true })}
                defaultValue=""
                id="courseCategory"
                className="form-style w-full"
                >
                <option value="" disabled>
                    Choose a Category
                </option>
                {!loading &&
                courseCategories?.map((category, indx) => (
                <option key={indx} value={category?._id}>
                    {category?.name}
                </option>
                ))}
                </select>
                {errors.courseCategory && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    Course Category is required
                </span>
                )}
            </label>

            <ChipInput
                label="Tags"
                name="courseTags"
                placeholder="Enter Tags and press Enter"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
            />

            <Upload
                name="courseImage"
                label="Course Thumbnail"
                register={register}
                setValue={setValue}
                errors={errors}
                editData={editCourse ? course?.thumbnail : null}
            />

            <label className='flex flex-col gap-4'>
                <p>Benefits of the course<sup className="text-pink-200">*</sup></p>
                <textarea
                     id="courseBenefits"
                    placeholder="Enter benefits of the course"
                    {...register("courseBenefits", { required: true })}
                    className="form-style resize-x-none min-h-[130px] w-full"
                />
                {errors.courseBenefits && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    Benefits of the course is required
                </span>
                )}
            </label>

            <RequirementsField
                name="courseRequirements"
                label="Requirements/Instructions"
                register={register}
                setValue={setValue}
                errors={errors}
                getValues={getValues}
            />

            <div className="flex justify-end gap-x-2">
                    {editCourse && (
                    <button
                        onClick={() => dispatch(setStep(2))}
                        disabled={loading}
                        className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
                    >
                        Continue Wihout Saving
                    </button>
                    )}
                    <IconBtn
                    disabled={loading}
                    text={!editCourse ? "Next" : "Save Changes"}
                    >
                    <MdNavigateNext/>
                    </IconBtn>
            </div>
            
         </form>
  )
}

export default CourseInformationForm
