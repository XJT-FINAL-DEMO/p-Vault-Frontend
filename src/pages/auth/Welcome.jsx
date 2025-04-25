import { Link } from "react-router";
import { useEffect, useRef } from "react";
import WelcomeBg from '../../assets/images/welcome.mp4'

const Welcome = () => {
  const videoRef = useRef(null);
  
  useEffect(() => {
    // Autoplay the video when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
       {/* Video Background */}
            <video
              autoPlay
              loop
              muted
              className="absolute top-0 left-0 min-w-full min-h-full w-auto h-auto object-cover z-0"
            >
              <source src={WelcomeBg} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
      
            {/* Optional: Add overlay for better text visibility */}
            <div className="absolute top-0 left-0 w-full h-full  z-10"></div>
      
      {/* Content */}
      <div className="max-w-md w-full space-y-8 bg-white bg-opacity-90 p-8 rounded-lg shadow-lg z-20">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome to pVault
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Your secure healthcare platform
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <Link
            to="/login"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign in
          </Link>
          
          <Link
            to="/rolesignup"
            className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;