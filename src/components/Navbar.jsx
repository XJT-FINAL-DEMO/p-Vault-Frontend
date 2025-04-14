// import React from "react";

// const Navbar = () => {
//   return <div>Navbar goes here</div>;
// };

// export default Navbar;
import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Enhanced function to check if the current path matches the link
  const isActive = (path) => {
    // For the home path, check if it's exactly "/"
    if (path === "/") {
      return location.pathname === "/";
    }
    // For specific paths like /adverts, match both /adverts and /adverts/:id
    if (path === "/adverts") {
      return location.pathname.startsWith("/adverts");
    }
    // For dashboard links
    if (path === "/dashboard") {
      return location.pathname.startsWith("/dashboard");
    }
    // For auth paths
    if (path === "/login" || path === "/signup") {
      return location.pathname === path;
    }
    // For other navigation paths
    if (["/about", "/blog", "/contact"].includes(path)) {
      return location.pathname.startsWith(path);
    }
    // Fallback
    return location.pathname === path;
  };

  // Active and inactive link styles
  const activeStyle =
    "text-emerald-400 font-medium border-b-2 border-emerald-400";
  const inactiveStyle =
    "text-gray-700 hover:text-emerald-400 hover:border-b-2 hover:border-emerald-400";

  return (
    <div className="w-full fixed top-0 left-0 right-0 z-50 px-4 py-3 bg-transparent">
      <nav className="bg-white shadow-md rounded max-w-7xl mx-auto">
        <div className="container mx-auto flex flex-wrap items-center justify-between px-4 py-3">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold">
              <span className="text-black">CLASSY</span>
              <span className="text-emerald-400">ADS</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-emerald-400 focus:outline-none"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                {isMenuOpen ? (
                  <path d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
                ) : (
                  <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                )}
              </svg>
            </button>
          </div>

          {/* Main menu */}
          <div
            className={`w-full md:flex md:items-center md:w-auto ${
              isMenuOpen ? "block" : "hidden"
            }`}
          >
            <ul className="md:flex md:space-x-6 mt-4 md:mt-0">
              <li>
                <Link
                  to="/"
                  className={`block py-2 transition-colors duration-200 ${
                    isActive("/") ? activeStyle : inactiveStyle
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/adverts"
                  className={`block py-2 transition-colors duration-200 ${
                    isActive("/adverts") ? activeStyle : inactiveStyle
                  }`}
                >
                  Ads
                </Link>
              </li>
              <li className="relative group">
                <Link
                  to="/about"
                  className={`block py-2 transition-colors duration-200 ${
                    isActive("/about") ? activeStyle : inactiveStyle
                  }`}
                >
                  About
                  {/* <span className="inline-block ml-1"></span> */}
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className={`block py-2 transition-colors duration-200 ${
                    isActive("/blog") ? activeStyle : inactiveStyle
                  }`}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={`block py-2 transition-colors duration-200 ${
                    isActive("/contact") ? activeStyle : inactiveStyle
                  }`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Auth buttons */}
          <div
            className={`md:flex items-center space-x-4 mt-4 md:mt-0 ${
              isMenuOpen ? "block" : "hidden"
            }`}
          >
            {false ? (
              <p>Logged In</p>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`block py-2 transition-colors duration-200 ${
                    isActive("/login") ? activeStyle : inactiveStyle
                  } md:inline-block`}
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className={`block py-2 transition-colors duration-200 ${
                    isActive("/signup") ? activeStyle : inactiveStyle
                  } md:inline-block`}
                >
                  Register
                </Link>
              </>
            )}
            <Link
              to="/dashboard/create-ad"
              className="block py-2 px-4 bg-emerald-400 text-white rounded hover:bg-emerald-500 md:inline-block transition-colors duration-200"
            >
              + Post an Ad
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
  sc;
};

export default Navbar;
