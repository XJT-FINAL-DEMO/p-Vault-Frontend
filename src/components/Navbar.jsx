import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in on component mount and when localStorage changes
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    // Check auth status on component mount
    checkAuthStatus();

    // Set up event listener for storage changes (in case user logs in/out in another tab)
    window.addEventListener("storage", checkAuthStatus);
    
    return () => {
      window.removeEventListener("storage", checkAuthStatus);
    };
  }, []);

  // Add scroll event listener to change navbar appearance when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Logout function
  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    localStorage.removeItem("userRole");
    
    // Update state
    setIsLoggedIn(false);
    
    // Navigate to login page
    navigate("/login");
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-md"
          : "bg-transparent backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span
                className={`font-bold text-xl ${
                  isScrolled ? "text-gray-800" : "text-white"
                }`}
              >
                p<span className="text-blue-500">Vault</span>
              </span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className={`font-medium px-3 py-2 rounded-md hover:bg-white/10 transition ${
                isScrolled ? "text-blue-500" : "text-white"
              }`}
            >
              Home
            </Link>
            <Link
              to="/appointments"
              className={`font-medium px-3 py-2 rounded-md hover:bg-white/10 transition ${
                isScrolled
                  ? "text-gray-600 hover:text-blue-500"
                  : "text-white/90 hover:text-white"
              }`}
            >
              Appointments
            </Link>
            <Link
              to="/checkin"
              className={`font-medium px-3 py-2 rounded-md hover:bg-white/10 transition ${
                isScrolled
                  ? "text-gray-600 hover:text-blue-500"
                  : "text-white/90 hover:text-white"
              }`}
            >
              CheckIn
            </Link>
           
            <Link
              to="/pharmacy"
              className={`font-medium px-3 py-2 rounded-md hover:bg-white/10 transition ${
                isScrolled
                  ? "text-gray-600 hover:text-blue-500"
                  : "text-white/90 hover:text-white"
              }`}
            >
              Pharmacy
            </Link>
            <Link
              to="/blogs"
              className={`font-medium px-3 py-2 rounded-md hover:bg-white/10 transition ${
                isScrolled
                  ? "text-gray-600 hover:text-blue-500"
                  : "text-white/90 hover:text-white"
              }`}
            >
              Pulse & Paper
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            {isLoggedIn ? (
              /* Buttons for logged-in users */
              <>
                <Link
                  to="/appointments"
                  className="bg-blue-500 text-white font-medium px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                  Book Appointment
                </Link>
                <button
                  onClick={handleLogout}
                  className={`font-medium px-3 py-2 rounded-md transition ${
                    isScrolled
                      ? "text-gray-600 hover:text-blue-500 hover:bg-gray-100"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  Logout
                </button>
              </>
            ) : (
              /* Login and SignUp buttons for guests */
              <>
                <Link
                  to="/login"
                  className={`font-medium px-3 py-2 transition ${
                    isScrolled
                      ? "text-gray-600 hover:text-blue-500"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  Log In
                </Link>
                <Link
                  to="/rolesignup"
                  className="bg-blue-500 text-white font-medium px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                  SignUp
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none ${
                isScrolled
                  ? "text-gray-700 hover:text-blue-500 hover:bg-green-50"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-md shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="text-blue-500 block px-3 py-2 rounded-md font-medium"
            >
              Home
            </Link>
            <Link
              to="/appointments"
              className="text-gray-600 block px-3 py-2 rounded-md font-medium hover:bg-green-50 hover:text-blue-500"
            >
              Appointments
            </Link>
            <Link
              to="/labs"
              className="text-gray-600 block px-3 py-2 rounded-md font-medium hover:bg-green-50 hover:text-blue-500"
            >
              Lab Tests
            </Link>
            <Link
              to="/pharmacy"
              className="text-gray-600 block px-3 py-2 rounded-md font-medium hover:bg-green-50 hover:text-blue-500"
            >
              Pharmacy
            </Link>
            <Link
              to="/blogs"
              className="text-gray-600 block px-3 py-2 rounded-md font-medium hover:bg-green-50 hover:text-blue-500"
            >
              Blogs
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isLoggedIn ? (
              /* Buttons for logged-in users (mobile) */
              <div className="px-5 flex flex-col space-y-2">
                <Link
                  to="/appointments"
                  className="bg-blue-500 text-white font-medium px-4 py-2 rounded-md hover:bg-blue-600 text-center"
                >
                  Book Appointment
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 font-medium px-4 py-2 rounded-md hover:bg-gray-100 hover:text-blue-500 text-center"
                >
                  Logout
                </button>
              </div>
            ) : (
              /* Login and SignUp buttons for guests (mobile) */
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <Link
                    to="/login"
                    className="text-gray-600 font-medium px-3 py-2 hover:text-blue-500"
                  >
                    Log In
                  </Link>
                </div>
                <div className="ml-3">
                  <Link
                    to="/signup"
                    className="bg-blue-500 text-white font-medium px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
