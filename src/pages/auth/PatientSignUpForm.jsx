import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // ✅ Corrected import
import { apiUserSignup } from '../../services/auth';

function PatientSignupForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate(); // ✅ Correct usage of navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    // ✅ Avoid shadowing by using a different name
    const formPayload = new FormData();
    formPayload.append("firstName", formData.firstName);
    formPayload.append("lastName", formData.lastName);
    formPayload.append("email", formData.email);
    formPayload.append("dateOfBirth", formData.dateOfBirth);
    formPayload.append("password", formData.password);
    formPayload.append("confirmPassword", formData.confirmPassword);

    try {
      const response = await apiUserSignup(formPayload);
      const { newUser } = response.data;
      localStorage.setItem("user", JSON.stringify(newUser));
      alert("Patient signup successful!");
      navigate('/login'); // ✅ Redirect after signup
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center pt-14">
      <div className="bg-white p-8 rounded-lg shadow-sm w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Sign up as a Patient</h1>
        
        <div className="text-center mb-6">
          <span>
            <Link to='/rolesignup' className="text-blue-500 hover:underline">Change role</Link>
            {" | "}
            <span>Already have an account? </span>
            <Link to='/login' className="text-blue-500 hover:underline">Login</Link>
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-sm font-medium mb-1">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-medium mb-1">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="dateOfBirth" className="block text-sm font-medium mb-1">Date of Birth</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Please use YYYY-MM-DD format (e.g., 1990-05-19)</p>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded font-medium"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

export default PatientSignupForm;
