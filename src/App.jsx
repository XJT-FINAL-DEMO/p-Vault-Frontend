// // // import { BrowserRouter, Route, Routes } from "react-router";
// // // import "./App.css";

// // // import RootLayout from "./layouts/RootLayout";
// // // import Landing from "./pages/user/Landing";
// // // import Login from "./pages/auth/Login";
// // // import Signup from "./pages/auth/Signup";
// // // import CheckIn from "./pages/user/CheckIn";
// // // import Appointments from "./pages/user/Appointments";
// // // import DashboardLayout from "./layouts/DashboardLayout";
// // // import Overview from "./pages/Dashboard/Overview";
// // // import DocAppointments from "./pages/Dashboard/DocAppointments";
// // // import CreateBlog from "./pages/Dashboard/CreateBlog";
// // // import DoctorBlogs from "./pages/Dashboard/DoctorBlogs";
// // // import UpdateBlog from "./pages/Dashboard/UpdateBlog";
// // // import Profile from "./pages/Dashboard/Profile";
// // // import Settings from "./pages/Dashboard/Settings";

// // // function App() {
// // //   return (
// // //     <div>
// // //       <BrowserRouter>
// // //         <Routes>
// // //           <Route path="/" element={<RootLayout />}>
// // //             <Route index={true} element={<Landing />} />
// // //             <Route path="/checkin" element={<CheckIn/>}/>
// // //             <Route path="/appointments" element={<Appointments/>}/>
// // //           </Route>

// // //           <Route path="/login" element={<Login />} />
// // //           <Route path="/signup" element={<Signup />} />

// // //         <Route path="/dashboard" element={<DashboardLayout/>}>
// // //         <Route index={true} element={<Overview/>}/>
// // //         <Route path="appointments" element={<DocAppointments/>}/>
// // //         <Route path="Create-blog" element={<CreateBlog/>}/>
// // //         <Route path="blogs" element={<DoctorBlogs/>} />
// // //         <Route path="updateBlog/:id"element={<UpdateBlog/>}/>


// // //         <Route path="settings"element={<Settings/>}/>
// // //         <Route path="profile"element={<Profile/>}/>




// // //         </Route>

// // //         </Routes>
// // //       </BrowserRouter>
// // //     </div>
// // //   );
// // // }

// // // export default App;
// // import { BrowserRouter, Route, Routes } from "react-router";
// // import "./App.css";

// // import RootLayout from "./layouts/RootLayout";
// // import Landing from "./pages/user/Landing";
// // import Login from "./pages/auth/Login";
// // import Signup from "./pages/auth/Signup";
// // import CheckIn from "./pages/user/CheckIn";
// // import Appointments from "./pages/user/Appointments";
// // import DashboardLayout from "./layouts/DashboardLayout";
// // import Overview from "./pages/Dashboard/Overview";
// // import DocAppointments from "./pages/Dashboard/DocAppointments";
// // import CreateBlog from "./pages/Dashboard/CreateBlog";
// // import DoctorBlogs from "./pages/Dashboard/DoctorBlogs";
// // import UpdateBlog from "./pages/Dashboard/UpdateBlog";
// // import Profile from "./pages/Dashboard/Profile";
// // import Settings from "./pages/Dashboard/Settings";
// // import BlogPage from "./pages/user/BlogPosts";
// // import PharmacyPage from "./pages/user/Pharmacy";

// // function App() {
// //   return (
// //     <div>
// //       <BrowserRouter>
// //         <Routes>
// //           <Route path="/" element={<RootLayout />}>
// //             <Route index={true} element={<Landing />} />
// //             <Route path="/checkin" element={<CheckIn />} />
// //             <Route path="/appointments" element={<Appointments />} />
// //             <Route path="/blogs" element={<BlogPage/>} />
// //             <Route path="pharmacy" element={<PharmacyPage/>}/>
// //           </Route>

// //           <Route path="/login" element={<Login />} />
// //           <Route path="/signup" element={<Signup />} />

// //           <Route path="/dashboard" element={<DashboardLayout />}>
// //             <Route index={true} element={<Overview />} />
// //             <Route path="appointments" element={<DocAppointments />} />
// //             <Route path="Create-blog" element={<CreateBlog />} />
// //             <Route path="blogs" element={<DoctorBlogs />} />
// //             <Route path="update-blog" element={<UpdateBlog />} /> {/* Added route without ID parameter */}
// //             <Route path="update-blog/:id" element={<UpdateBlog />} /> {/* Kept original route with ID parameter */}
// //             <Route path="settings" element={<Settings />} />
// //             <Route path="profile" element={<Profile />} />
// //           </Route>
// //         </Routes>
// //       </BrowserRouter>
// //     </div>
// //   );
// // }

// // export default App;

// import { BrowserRouter, Route, Routes } from "react-router";
// import "./App.css";

// import RootLayout from "./layouts/RootLayout";
// import Landing from "./pages/user/Landing";
// import Login from "./pages/auth/Login";
// import Signup from "./pages/auth/Signup";
// import RoleSelection from "./pages/auth/RoleSelection"; // Import the new component
// import CheckIn from "./pages/user/CheckIn";
// import Appointments from "./pages/user/Appointments";
// import DashboardLayout from "./layouts/DashboardLayout";
// import Overview from "./pages/Dashboard/Overview";
// import DocAppointments from "./pages/Dashboard/DocAppointments";
// import CreateBlog from "./pages/Dashboard/CreateBlog";
// import DoctorBlogs from "./pages/Dashboard/DoctorBlogs";
// import UpdateBlog from "./pages/Dashboard/UpdateBlog";
// import Profile from "./pages/Dashboard/Profile";
// import Settings from "./pages/Dashboard/Settings";
// import BlogPage from "./pages/user/BlogPosts";
// import PharmacyPage from "./pages/user/Pharmacy";

// function App() {
//   return (
//     <div>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<RootLayout />}>
//             <Route index={true} element={<Landing />} />
//             <Route path="/checkin" element={<CheckIn />} />
//             <Route path="/appointments" element={<Appointments />} />
//             <Route path="/blogs" element={<BlogPage />} />
//             <Route path="pharmacy" element={<PharmacyPage />} />
//           </Route>

//           {/* Role Selection Routes */}
//           <Route path="/login" element={<RoleSelection mode="login" />} />
//           <Route path="/signup" element={<RoleSelection mode="signup" />} />
          
//           {/* Role-specific Login Routes */}
//           <Route path="/login/:role" element={<Login />} />
          
//           {/* Role-specific Signup Routes */}
//           <Route path="/signup/:role" element={<Signup />} />

//           <Route path="/dashboard" element={<DashboardLayout />}>
//             <Route index={true} element={<Overview />} />
//             <Route path="appointments" element={<DocAppointments />} />
//             <Route path="Create-blog" element={<CreateBlog />} />
//             <Route path="blogs" element={<DoctorBlogs />} />
//             <Route path="update-blog" element={<UpdateBlog />} />
//             <Route path="update-blog/:id" element={<UpdateBlog />} />
//             <Route path="settings" element={<Settings />} />
//             <Route path="profile" element={<Profile />} />
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;

import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";

import RootLayout from "./layouts/RootLayout";
import Landing from "./pages/user/Landing";
import Login from "./pages/auth/Login";

import RoleSelection from "./pages/auth/RoleSelection"; // Only used for signup now
import CheckIn from "./pages/user/CheckIn";
import Appointments from "./pages/user/Appointments";
import DashboardLayout from "./layouts/DashboardLayout";
import Overview from "./pages/Dashboard/Overview";
import DocAppointments from "./pages/Dashboard/DocAppointments";
import CreateBlog from "./pages/Dashboard/CreateBlog";
import DoctorBlogs from "./pages/Dashboard/DoctorBlogs";
import UpdateBlog from "./pages/Dashboard/UpdateBlog";
import Profile from "./pages/Dashboard/Profile";
import Settings from "./pages/Dashboard/Settings";
import BlogPage from "./pages/user/BlogPosts";
import PharmacyPage from "./pages/user/Pharmacy";
import PatientSignupForm from "./pages/auth/PatientSignUpForm";
import DoctorSignupForm from "./pages/auth/DoctorSignupForm";
import Welcome from "./pages/auth/Welcome";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index={true} element={<Landing />} />
            <Route path="/checkin" element={<CheckIn />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/blogs" element={<BlogPage />} />
            <Route path="pharmacy" element={<PharmacyPage />} />
          </Route>

          {/* Login Route - No role selection needed */}
          <Route path="/login" element={<Login />} />
          
          {/* Signup Routes - Keep role selection */}
          <Route path="/welcome" element={<Welcome/>}/>
          <Route path="/rolesignup" element={<RoleSelection />} />
          <Route path="/patientsignup" element={<PatientSignupForm/>} />
          <Route path="/doctorsignup" element={<DoctorSignupForm/>}/>

          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index={true} element={<Overview />} />
            <Route path="appointments" element={<DocAppointments />} />
            <Route path="Create-blog" element={<CreateBlog />} />
            <Route path="blogs" element={<DoctorBlogs />} />
            <Route path="update-blog" element={<UpdateBlog />} />
            <Route path="update-blog/:id" element={<UpdateBlog />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;