// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom"; // Fixed import
// import { apiDoctorSignUp } from "../../services/auth";

// function DoctorSignupForm() {
//   const navigate = useNavigate(); // Changed from "Navigate"

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     specialization: "",
//     licenseNumber: "",
//     facility: "",
//     password: "",
//     confirmPassword: "",
//     role: "doctor",
//   });

//   const facilities = [
//     { name: "St Bernards Memorial", id: "6808f8a058b4819f77e15edc" },
//     { name: "University Medical Center", id: "6808f8a058b4819f77e15edd" },
//     { name: "Evergreen Medical Center", id: "6808f8a058b4819f77e15ede" },
//     { name: "St. Grace Hospital", id: "6808f8a058b4819f77e15edf" },
//     { name: "Riverside Hospital", id: "6808f8a058b4819f77e15ee0" },
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match.");
//       return;
//     }

//     const selectedFacility = facilities.find(
//       (f) => f.name === formData.facility
//     );

//     const payload = {
//       firstName: formData.firstName,
//       lastName: formData.lastName,
//       email: formData.email,
//       password: formData.password,
//       confirmPassword: formData.confirmPassword,
//       specialization: formData.specialization,
//       license: formData.licenseNumber,
//       facilities: selectedFacility ? [selectedFacility.id] : [],
//       role: formData.role,
//       availability: [],
//     };

//     try {
//       const response = await apiDoctorSignUp(payload);
//       console.log("Signup response:", response); // Debug line
//       const { doctor } = response.data;
//       localStorage.setItem("user", JSON.stringify(doctor.role));
//       alert("Doctor signup successful!");
//       navigate("/login"); // Correct usage
//     } catch (error) {
//       console.error("Signup error:", error.response?.data || error.message);
//       alert("Signup failed. Please check your input and try again.");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center">
//       <div className="bg-white p-8 rounded-lg shadow-sm w-full max-w-md">
//         <h1 className="text-2xl font-bold text-center mb-6">
//           Sign up as a Doctor
//         </h1>

//         <div className="text-center mb-6">
//           <span>
//             <Link to="/rolesignup" className="text-blue-500 hover:underline">
//               Change role
//             </Link>{" "}
//             | <span>Already have an account? </span>
//             <Link to="/login" className="text-blue-500 hover:underline">
//               Login
//             </Link>
//           </span>
//         </div>

//         <form onSubmit={handleSubmit}>
//           {/* All inputs remain unchanged */}
//           <div className="mb-4">
//             <label htmlFor="firstName" className="block text-sm font-medium mb-1">
//               First Name
//             </label>
//             <input
//               type="text"
//               id="firstName"
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="lastName" className="block text-sm font-medium mb-1">
//               Last Name
//             </label>
//             <input
//               type="text"
//               id="lastName"
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="email" className="block text-sm font-medium mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="specialization" className="block text-sm font-medium mb-1">
//               Specialization
//             </label>
//             <input
//               type="text"
//               id="specialization"
//               name="specialization"
//               value={formData.specialization}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="licenseNumber" className="block text-sm font-medium mb-1">
//               Medical License Number
//             </label>
//             <input
//               type="text"
//               id="licenseNumber"
//               name="licenseNumber"
//               value={formData.licenseNumber}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="facility" className="block text-sm font-medium mb-1">
//               Facility
//             </label>
//             <select
//               id="facility"
//               name="facility"
//               value={formData.facility}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded"
//               required
//             >
//               <option value="">-- Select a facility --</option>
//               {facilities.map((facility) => (
//                 <option key={facility.id} value={facility.name}>
//                   {facility.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="mb-4">
//             <label htmlFor="password" className="block text-sm font-medium mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded"
//               required
//             />
//           </div>

//           <div className="mb-6">
//             <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               id="confirmPassword"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded font-medium"
//           >
//             Sign up
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default DoctorSignupForm;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiDoctorSignUp } from "../../services/auth";

function DoctorSignupForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    specialization: "",
    licenseNumber: "",
    facility: "",
    password: "",
    confirmPassword: "",
    role: "doctor", // Default role is doctor
  });

  const facilities = [
    { name: "St Bernards Memorial", id: "6808f8a058b4819f77e15edc" },
    { name: "University Medical Center", id: "6808f8a058b4819f77e15edd" },
    { name: "Evergreen Medical Center", id: "6808f8a058b4819f77e15ede" },
    { name: "St. Grace Hospital", id: "6808f8a058b4819f77e15edf" },
    { name: "Riverside Hospital", id: "6808f8a058b4819f77e15ee0" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Clear any previous errors when the user makes changes
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Password validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    // Find the selected facility object
    const selectedFacility = facilities.find(
      (f) => f.name === formData.facility
    );

    // Prepare the payload according to API requirements
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      specialization: formData.specialization,
      license: formData.licenseNumber,
      facilities: selectedFacility ? [selectedFacility.id] : [],
      role: formData.role,
      availability: [],
    };

    try {
      // Make the API call
      const response = await apiDoctorSignUp(payload);
      console.log("Signup successful:", response);
      
      // Handle successful response
      if (response && response.data) {
        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(formData.role));
        
        // Show success message
        alert(`${formData.role.charAt(0).toUpperCase() + formData.role.slice(1)} signup successful!`);
        
        // Navigate to login page
        navigate("/login");
      }
    } catch (error) {
      // Handle error
      console.error("Signup error:", error);
      
      // Extract error message from response if available
      const errorMessage = 
        error.response?.data?.message || 
        "Signup failed. Please check your input and try again.";
      
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Get form title based on selected role
  const getFormTitle = () => {
    return `Sign up as a ${formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}`;
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-sm w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          {getFormTitle()}
        </h1>

        <div className="text-center mb-6">
          <span>
            <Link to="/rolesignup" className="text-blue-500 hover:underline">
              Change role
            </Link>{" "}
            | <span>Already have an account? </span>
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </span>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="role" className="block text-sm font-medium mb-1">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="doctor">Doctor</option>
              <option value="pharmacist">Pharmacist</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="firstName" className="block text-sm font-medium mb-1">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-medium mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="specialization" className="block text-sm font-medium mb-1">
              Specialization
            </label>
            <input
              type="text"
              id="specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="licenseNumber" className="block text-sm font-medium mb-1">
              {formData.role === "doctor" ? "Medical" : "Pharmacy"} License Number
            </label>
            <input
              type="text"
              id="licenseNumber"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="facility" className="block text-sm font-medium mb-1">
              Facility
            </label>
            <select
              id="facility"
              name="facility"
              value={formData.facility}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">-- Select a facility --</option>
              {facilities.map((facility) => (
                <option key={facility.id} value={facility.name}>
                  {facility.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded font-medium ${
              isLoading 
                ? "bg-blue-300 cursor-not-allowed" 
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {isLoading ? "Signing up..." : "Sign up"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default DoctorSignupForm;