
// //working code

// import { useState } from "react";
// import { useNavigate } from "react-router";
// import { apiSignup } from "../../services/auth";

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });

//     if (errors[name]) {
//       setErrors({ ...errors, [name]: "" });
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.firstName.trim()) {
//       newErrors.firstName = "First name is required";
//     }

//     if (!formData.lastName.trim()) {
//       newErrors.lastName = "Last name is required";
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     }

//     if (!formData.password) {
//       newErrors.password = "Password is required";
//     }

//     if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = "Passwords must match";
//     }

//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const response = await apiSignup(formData);
//       console.log("Signup response:", response);

//       if (response.error) {
//         setErrors({ submit: response.error });
//       } else {
//         alert("Signup successful!");
//         navigate("/login");
//       }
//     } catch (error) {
//       console.error("Signup failed:", error);
//       setErrors({
//         submit: error.message || "Signup failed. Please try again.",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
//         <h2 className="text-center text-3xl font-extrabold text-gray-900">
//           Sign up for an account
//         </h2>

//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="rounded-md shadow-sm -space-y-px">
//             <div className="space-y-4">
//               <div>
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
//                   className={`mt-1 block w-full px-3 py-2 border ${
//                     errors.firstName ? "border-red-300" : "border-gray-300"
//                   } placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
//                   placeholder="First name"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                 />
//                 {errors.firstName && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {errors.firstName}
//                   </p>
//                 )}
//               </div>

//               <div>
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
//                   className={`mt-1 block w-full px-3 py-2 border ${
//                     errors.lastName ? "border-red-300" : "border-gray-300"
//                   } placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
//                   placeholder="Last name"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                 />
//                 {errors.lastName && (
//                   <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
//                 )}
//               </div>

//               <div>
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
//                   required
//                   className={`mt-1 block w-full px-3 py-2 border ${
//                     errors.email ? "border-red-300" : "border-gray-300"
//                   } placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
//                   placeholder="Email address"
//                   value={formData.email}
//                   onChange={handleChange}
//                 />
//                 {errors.email && (
//                   <p className="mt-1 text-sm text-red-600">{errors.email}</p>
//                 )}
//               </div>

//               <div>
//                 <label
//                   htmlFor="password"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Password
//                 </label>
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   required
//                   className={`mt-1 block w-full px-3 py-2 border ${
//                     errors.password ? "border-red-300" : "border-gray-300"
//                   } placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
//                   placeholder="Password"
//                   value={formData.password}
//                   onChange={handleChange}
//                 />
//                 {errors.password && (
//                   <p className="mt-1 text-sm text-red-600">{errors.password}</p>
//                 )}
//               </div>

//               <div>
//                 <label
//                   htmlFor="confirmPassword"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Confirm Password
//                 </label>
//                 <input
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   type="password"
//                   required
//                   className={`mt-1 block w-full px-3 py-2 border ${
//                     errors.confirmPassword
//                       ? "border-red-300"
//                       : "border-gray-300"
//                   } placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
//                   placeholder="Confirm Password"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                 />
//                 {errors.confirmPassword && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {errors.confirmPassword}
//                   </p>
//                 )}
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


// import { useState, useEffect } from "react";
// import { Link, useNavigate, useParams } from "react-router"; 
// import { apiDoctorSignUp } from "../../services/auth";

// // List of major hospital facilities in Ghana with IDs
// const GHANA_FACILITIES = [
//   { id: "", name: "-- Select a facility --" },
//   { id: "680a1df3f80b9be4391cdcd0", name: "St Bernards Memorial" },
//   { id: "680a2007f80b9be4391cdcd8", name: "University Medical Center" },
//   { id: "680a2057f80b9be4391cdce0", name: "Evergreen Medical Center" },
//   { id: "680a2154f80b9be4391cdce8", name: "St. Grace Hospital" },
//   { id: "680a21bcf80b9be4391cdcf0", name: "Riverside Hospital" }
// ];

// const Signup = () => {
//   const { role } = useParams(); // Get role from URL parameters
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     role: role || "patient", // Default to patient if no role specified
//     // Role-specific fields
//     dateOfBirth: "",
//     specialization: "",
//     licenseNumber: "",
//     license: "",  // Changed field name to 'license'
//     facilities: "" // Single facility ID selection
//   });
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();

//   // Update role when parameter changes
//   useEffect(() => {
//     if (role) {
//       setFormData(prevState => ({
//         ...prevState,
//         role
//       }));
//     }
//   }, [role]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });

//     if (errors[name]) {
//       setErrors({ ...errors, [name]: "" });
//     }
//   };

//   // Special handler for date input ensuring YYYY-MM-DD format
//   const handleDateChange = (e) => {
//     const { name, value } = e.target;
    
//     // Ensure the date is in YYYY-MM-DD format
//     // The input type="date" should already handle this,
//     // but we'll make sure it's properly formatted
//     setFormData({ ...formData, [name]: value });
    
//     if (errors[name]) {
//       setErrors({ ...errors, [name]: "" });
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.firstName.trim()) {
//       newErrors.firstName = "First name is required";
//     }

//     if (!formData.lastName.trim()) {
//       newErrors.lastName = "Last name is required";
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Email is invalid";
//     }

//     if (!formData.password) {
//       newErrors.password = "Password is required";
//     } else if (formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }

//     if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = "Passwords must match";
//     }

//     // Role-specific validations
//     if (formData.role === 'doctor') {
//       if (!formData.specialization) {
//         newErrors.specialization = "Specialization is required";
//       }
//       if (!formData.facilities) {
//         newErrors.facilities = "Please select a facility";
//       }
//       if (!formData.license) {
//         newErrors.license = "Medical license number is required";
//       }
//     }

//     if (formData.role === 'pharmacist') {
//       if (!formData.licenseNumber) {
//         newErrors.licenseNumber = "License number is required";
//       }
//       if (!formData.facilities) {
//         newErrors.facilities = "Please select a facility";
//       }
//     }

//     if (formData.role === 'patient' && !formData.dateOfBirth) {
//       newErrors.dateOfBirth = "Date of birth is required";
//     } else if (formData.role === 'patient') {
//       // Validate the date is in YYYY-MM-DD format
//       const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
//       if (!dateRegex.test(formData.dateOfBirth)) {
//         newErrors.dateOfBirth = "Date must be in YYYY-MM-DD format";
//       }
//     }

//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }
  
//     setIsSubmitting(true);
  
//     // Prepare payload - exclude confirmPassword as it's not needed by API
//     const payload = { ...formData };
  
//     // Convert facilities string to array for backend format
//     if (payload.facilities) {
//       payload.facilities = [payload.facilities];
//     } else {
//       payload.facilities = [];
//     }
  
//     try {
//       const response = await apiDoctorSignUp(payload);
      
//       if (!response.success) {
//         throw new Error(response.error || "Signup failed");
//       }
  
//       alert("Signup successful! Please login.");
//       navigate("/login/" + payload.role);
//     } catch (error) {
//       console.error("Signup failed:", error);
//       setErrors({
//         submit: error.message || "Signup failed. Please try again.",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
  

//   // Get role-specific fields based on the selected role
//   const getRoleSpecificFields = () => {
//     switch (formData.role) {
//       case 'doctor':
//         return (
//           <div className="space-y-4">
//             <div>
//               <label
//                 htmlFor="specialization"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Specialization
//               </label>
//               <input
//                 id="specialization"
//                 name="specialization"
//                 type="text"
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 placeholder="Your medical specialization"
//                 value={formData.specialization || ""}
//                 onChange={handleChange}
//               />
//               {errors.specialization && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.specialization}
//                 </p>
//               )}
//             </div>
            
//             <div>
//               <label
//                 htmlFor="license"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Medical License Number
//               </label>
//               <input
//                 id="license"
//                 name="license"
//                 type="text"
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 placeholder="Your medical license number"
//                 value={formData.license || ""}
//                 onChange={handleChange}
//               />
//               {errors.license && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.license}
//                 </p>
//               )}
//             </div>
            
//             <div>
//               <label
//                 htmlFor="facilities"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Facility
//               </label>
//               <select
//                 id="facilities"
//                 name="facilities"
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 value={formData.facilities}
//                 onChange={handleChange}
//               >
//                 {GHANA_FACILITIES.map((facility) => (
//                   <option key={facility.id} value={facility.id}>
//                     {facility.name}
//                   </option>
//                 ))}
//               </select>
//               {errors.facilities && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.facilities}
//                 </p>
//               )}
//             </div>
//           </div>
//         );
//       case 'pharmacist':
//         return (
//           <div className="space-y-4">
//             <div>
//               <label
//                 htmlFor="licenseNumber"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 License Number
//               </label>
//               <input
//                 id="licenseNumber"
//                 name="licenseNumber"
//                 type="text"
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 placeholder="Your pharmacist license number"
//                 value={formData.licenseNumber || ""}
//                 onChange={handleChange}
//               />
//               {errors.licenseNumber && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.licenseNumber}
//                 </p>
//               )}
//             </div>
            
//             <div>
//               <label
//                 htmlFor="facilities"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Facility
//               </label>
//               <select
//                 id="facilities"
//                 name="facilities"
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 value={formData.facilities}
//                 onChange={handleChange}
//               >
//                 {GHANA_FACILITIES.map((facility) => (
//                   <option key={facility.id} value={facility.id}>
//                     {facility.name}
//                   </option>
//                 ))}
//               </select>
//               {errors.facilities && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.facilities}
//                 </p>
//               )}
//             </div>
//           </div>
//         );
//       case 'patient':
//       default:
//         return (
//           <div>
//             <label
//               htmlFor="dateOfBirth"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Date of Birth
//             </label>
//             <input
//               id="dateOfBirth"
//               name="dateOfBirth"
//               type="date" 
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               value={formData.dateOfBirth || ""}
//               onChange={handleDateChange}
//             />
//             {errors.dateOfBirth && (
//               <p className="mt-1 text-sm text-red-600">
//                 {errors.dateOfBirth}
//               </p>
//             )}
//             <p className="mt-1 text-xs text-gray-500">
//               Please use YYYY-MM-DD format (e.g., 1999-05-19)
//             </p>
//           </div>
//         );
//     }
//   };

//   // Get role display name
//   const getRoleDisplayName = () => {
//     switch (formData.role) {
//       case 'doctor':
//         return 'Doctor';
//       case 'pharmacist':
//         return 'Pharmacist';
//       case 'patient':
//       default:
//         return 'Patient';
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
//         <h2 className="text-center text-3xl font-extrabold text-gray-900">
//           Sign up as a {getRoleDisplayName()}
//         </h2>
//         <p className="mt-2 text-center text-sm text-gray-600">
//           <Link
//             to="/signup"
//             className="font-medium text-blue-600 hover:text-blue-500"
//           >
//             Change role
//           </Link>
//           {" | "}
//           <Link
//             to="/login"
//             className="font-medium text-blue-600 hover:text-blue-500"
//           >
//             Already have an account? Login
//           </Link>
//         </p>

//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="rounded-md shadow-sm -space-y-px">
//             <div className="space-y-4">
//               <div>
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
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                   placeholder="First name"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                 />
//                 {errors.firstName && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {errors.firstName}
//                   </p>
//                 )}
//               </div>

//               <div>
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
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                   placeholder="Last name"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                 />
//                 {errors.lastName && (
//                   <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
//                 )}
//               </div>

//               <div>
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
//                   required
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                   placeholder="Email address"
//                   value={formData.email}
//                   onChange={handleChange}
//                 />
//                 {errors.email && (
//                   <p className="mt-1 text-sm text-red-600">{errors.email}</p>
//                 )}
//               </div>

//               {/* Role-specific fields */}
//               {getRoleSpecificFields()}

//               <div>
//                 <label
//                   htmlFor="password"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Password
//                 </label>
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   required
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                   placeholder="Password"
//                   value={formData.password}
//                   onChange={handleChange}
//                 />
//                 {errors.password && (
//                   <p className="mt-1 text-sm text-red-600">{errors.password}</p>
//                 )}
//               </div>

//               <div>
//                 <label
//                   htmlFor="confirmPassword"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Confirm Password
//                 </label>
//                 <input
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   type="password"
//                   required
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                   placeholder="Confirm Password"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                 />
//                 {errors.confirmPassword && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {errors.confirmPassword}
//                   </p>
//                 )}
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