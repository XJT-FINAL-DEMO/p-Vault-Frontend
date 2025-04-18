
// // export default Signup;
// import { useState } from "react";
// import { Link, useNavigate } from "react-router";
// import { EyeIcon, EyeOffIcon } from "lucide-react";
// import { apiSignup } from "../../services/auth";

// const Signup = () => {
//   const navigate = useNavigate();
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData(e.target);

//     try {
//       const response = await apiSignup(formData);
//       console.log(response);
      
//       navigate("/login");

//     } catch (error) {
//       console.log(error);
      
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Create your account
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             Already have an account?{" "}
//             <Link
//               to="/login"
//               className="font-medium text-blue-600 hover:text-blue-500"
//             >
//               Sign in
//             </Link>
//           </p>
//         </div>

//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="rounded-md shadow-sm -space-y-px">
//             <div className="grid grid-cols-1 gap-4 mb-4">
//               <div className="col-span-1">
//                 <label
//                   htmlFor="firstName"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   First Name
//                 </label>
//                 <input
//                   id="firstName"
//                   name="firstName"
//                   type="text"
//                   required
//                   className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
//                     errors.firstName ? "border-red-300" : "border-gray-300"
//                   } placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
//                   placeholder="First Name"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                 />
//                 {errors.firstName && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {errors.firstName}
//                   </p>
//                 )}
//               </div>

//               <div className="col-span-1">
//                 <label
//                   htmlFor="lastName"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Last Name
//                 </label>
//                 <input
//                   id="lastName"
//                   name="lastName"
//                   type="text"
//                   required
//                   className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
//                     errors.lastName ? "border-red-300" : "border-gray-300"
//                   } placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
//                   placeholder="Last Name"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                 />
//                 {errors.lastName && (
//                   <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
//                 )}
//               </div>

//               <div className="col-span-1">
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Email address
//                 </label>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
//                     errors.email ? "border-red-300" : "border-gray-300"
//                   } placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
//                   placeholder="Email address"
//                   value={formData.email}
//                   onChange={handleChange}
//                 />
//                 {errors.email && (
//                   <p className="mt-1 text-sm text-red-600">{errors.email}</p>
//                 )}
//               </div>

//               <div className="col-span-1">
//                 <label
//                   htmlFor="password"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Password
//                 </label>
//                 <div className="mt-1 relative">
//                   <input
//                     id="password"
//                     name="password"
//                     type={showPassword ? "text" : "password"}
//                     autoComplete="new-password"
//                     required
//                     className={`appearance-none relative block w-full px-3 py-2 border ${
//                       errors.password ? "border-red-300" : "border-gray-300"
//                     } placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
//                     placeholder="Password"
//                     value={formData.password}
//                     onChange={handleChange}
//                   />
//                   <button
//                     type="button"
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? (
//                       <EyeOffIcon className="h-5 w-5 text-gray-400" />
//                     ) : (
//                       <EyeIcon className="h-5 w-5 text-gray-400" />
//                     )}
//                   </button>
//                 </div>
//                 {errors.password && (
//                   <p className="mt-1 text-sm text-red-600">{errors.password}</p>
//                 )}
//               </div>

//               <div className="col-span-1">
//                 <label
//                   htmlFor="confirmPassword"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Confirm Password
//                 </label>
//                 <div className="mt-1 relative">
//                   <input
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     type={showConfirmPassword ? "text" : "password"}
//                     autoComplete="new-password"
//                     required
//                     className={`appearance-none relative block w-full px-3 py-2 border ${
//                       errors.confirmPassword
//                         ? "border-red-300"
//                         : "border-gray-300"
//                     } placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
//                     placeholder="Confirm Password"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                   />
//                   <button
//                     type="button"
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   >
//                     {showConfirmPassword ? (
//                       <EyeOffIcon className="h-5 w-5 text-gray-400" />
//                     ) : (
//                       <EyeIcon className="h-5 w-5 text-gray-400" />
//                     )}
//                   </button>
//                 </div>
//                 {errors.confirmPassword && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {errors.confirmPassword}
//                   </p>
//                 )}
//               </div>

//               <div className="col-span-1">
//                 <label
//                   htmlFor="role"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Role
//                 </label>
//                 <select
//                   id="role"
//                   name="role"
//                   className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                   value={formData.role}
//                   onChange={handleChange}
//                 >
//                   <option value="patient">Patient</option>
//                   <option value="doctor">Doctor</option>
//                   <option value="labTech">Lab Technician</option>
//                   <option value="pharmacist">Pharmacist</option>
//                   <option value="nurse">Nurse</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {errors.submit && (
//             <div className="rounded-md bg-red-50 p-4">
//               <div className="flex">
//                 <div className="ml-3">
//                   <h3 className="text-sm font-medium text-red-800">
//                     {errors.submit}
//                   </h3>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div>
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
//             >
//               {isSubmitting ? "Signing up..." : "Sign up"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;


import { useState } from "react";
import { Link, useNavigate } from "react-router"; 
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { apiSignup } from "../../services/auth";

const Signup = () => {
  const navigate = useNavigate();
  
  // Add missing state variables
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "patient" // Default role
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Add handleChange function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    // Clear errors when field changes
    if (errors[name]) {
      setErrors(prevState => ({
        ...prevState,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      setIsSubmitting(false);
      return;
    }

    try {
      // Send data as JSON, not FormData
      const response = await apiSignup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });
      
      console.log("Signup successful:", response);
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      setErrors({
        submit: error.response
          ? error.response.data.message
          : "Failed to sign up. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="grid grid-cols-1 gap-4 mb-4">
              <div className="col-span-1">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                    errors.firstName ? "border-red-300" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div className="col-span-1">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                    errors.lastName ? "border-red-300" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                )}
              </div>

              <div className="col-span-1">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                    errors.email ? "border-red-300" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div className="col-span-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    className={`appearance-none relative block w-full px-3 py-2 border ${
                      errors.password ? "border-red-300" : "border-gray-300"
                    } placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div className="col-span-1">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    className={`appearance-none relative block w-full px-3 py-2 border ${
                      errors.confirmPassword
                        ? "border-red-300"
                        : "border-gray-300"
                    } placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOffIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <div className="col-span-1">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                  <option value="labTech">Lab Technician</option>
                  <option value="pharmacist">Pharmacist</option>
                  <option value="nurse">Nurse</option>
                </select>
              </div>
            </div>
          </div>

          {errors.submit && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    {errors.submit}
                  </h3>
                </div>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
            >
              {isSubmitting ? "Signing up..." : "Sign up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;