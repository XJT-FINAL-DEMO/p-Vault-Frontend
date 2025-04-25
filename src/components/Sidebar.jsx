// import React from "react";
// import K from "../constants";
// import { NavLink } from "react-router";

// const Sidebar = () => {
//   return (
//     <div className="flex flex-col w-60 gap-y-6 bg-blue-300 h-screen px-2 py-4 fixed left-0 top-0  ">
//       <span>Logo Here</span>
//       <div className=" flex flex-col gap-y-6">
//         {
//           // sidebar content
//           K.NAVLINKS.map((link) => {
//             return (
//               <NavLink
//                 to={link.Path}
//                 // className="text-white hover:bg-white hover:text-black px-3 py-2 w-full rounded-md flex gap-x-2"
//                 className={({ isActive }) =>
//                   `text-gray-700 hover:bg-white hover:text-black px-3 py-2 w-full rounded-md flex items-center gap-x-2
//                  ${isActive ? "bg-white text-black font-bold shadow-md" : ""}`
//                 }
//               >
//                 <link.icon />
//                 <span> {link.name}</span>
//               </NavLink>
//             );
//           })
//         }
//       </div>
//       <button className="mt-auto">Logout</button>
//     </div>
//   );
// };

// export default Sidebar;


import React from "react";
import K from "../constants";
import { NavLink } from "react-router-dom"; // Fixed import from react-router-dom

const Sidebar = () => {
  return (
    <div className="flex flex-col w-60 gap-y-6 bg-blue-300 h-screen px-2 py-4 fixed left-0 top-0">
       <div className="px-15 mb-6 text-2xl font-bold">
        <span className="text-white">p</span>
        <span className="text-blue-500">Vault</span>
      </div>
      <div className="flex flex-col gap-y-6">
        {
          // sidebar content
          K.NAVLINKS.map((link) => {
            return (
              <NavLink
                key={link.Path} // Added unique key prop
                to={link.Path}
                className={({ isActive }) =>
                  `text-gray-700 hover:bg-white hover:text-black px-3 py-2 w-full rounded-md flex items-center gap-x-2
                 ${isActive ? "bg-white text-black font-bold shadow-md" : ""}`
                }
              >
                <link.icon />
                <span> {link.name}</span>
              </NavLink>
            );
          })
        }
      </div>
        <NavLink 
        to="/login" 
        className="mt-auto bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md text-center font-medium transition-colors duration-200"
      >
        Logout
      </NavLink>
    </div>
  );
};

export default Sidebar;