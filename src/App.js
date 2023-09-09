import "./App.css";
import { Route,Routes } from "react-router-dom";
import Home from './pages/Home'
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Error from './pages/Error';
import MyProfile from "./components/core/DashBoard/MyProfile";
import DashBoard from "./pages/DashBoard";
import Settings from "./components/core/DashBoard/Settings";
import EntrolledCourses from "./components/core/DashBoard/EntrolledCourses";
import Cart from "./components/core/DashBoard/Cart";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/constant";
import AddCourse from "./components/core/DashBoard/addCourse";
import MyCourses from "./components/core/DashBoard/MyCourses";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
// import OpenRoute from "./components/core/Auth/OpenRoute";
// import PrivateRoute from "./components/core/Auth/PrivateRoute";

function App() {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile)

  return (
   <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter ">
       <Navbar/>
       <Routes>
          <Route path="/" element={<Home/>} ></Route>

          <Route path="/login" element={
          // <OpenRoute>
          <Login/>
          // </OpenRoute>  
          }></Route>

          <Route path="/signup" element={
          // <OpenRoute>
          <Signup/>
          // </OpenRoute>
          }></Route>

          <Route path="/verify-email" element={
            // <OpenRoute>
              <VerifyEmail/>
            // </OpenRoute>
          }></Route>
          <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
          <Route path="/update-password/:id" element={<UpdatePassword/>}></Route>
          <Route path="/about" element={<About/>}></Route>
          <Route path="/contact" element={<Contact/>}></Route>
          <Route path="*" element={<Error/>} />
          <Route path='/catalog/:catalogName' element={<Catalog/>}/>
          <Route path="/courses/:courseId" element={<CourseDetails/>}/>
          {/* <Route path="dashboard/settings" element={< />} /> */}
          <Route element={
            // <PrivateRoute>
              <DashBoard/>
            // </PrivateRoute>
          }>
            <Route path="/dashboard/my-profile" element={<MyProfile/>}/>
            <Route path="/dashboard/settings" element={<Settings/>} />
            {
              user?.accountType === ACCOUNT_TYPE.STUDENT && (
                <>
                  <Route path="/dashboard/enrolled-courses" element={<EntrolledCourses/>}/>
                  <Route path="/dashboard/cart" element={<Cart/>} />
                </>
              )
            }
            {
              user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                <>
                  <Route path="/dashboard/add-course" element={<AddCourse/>}/>
                  <Route path="/dashboard/my-courses" element={<MyCourses/>} />
                  {/* <Route path="dashboard/edit-course/:courseId" element={< />} /> */}
                </>
              )
            }
          </Route>
       </Routes>
   </div>
  );
}

export default App;
