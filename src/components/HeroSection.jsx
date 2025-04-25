// import React from "react";
// import heroBg from "../assets/images/herobg.mp4";
// const HeroSection = () => {
//   return (
//     <div className="relative h-screen w-full overflow-hidden">
//       {/* Video Background */}
//       <video
//         autoPlay
//         loop
//         muted
//         classname="absolute top-0 left-0 min-w-full min-h-full w-auto h-auto object-cover z-0"
//         src=""
//       >
//         <source src={heroBg} />
//       </video>
//     </div>
//   );
// };

// export default HeroSection;

import React from "react";
import heroBg from "../assets/images/herobg.mp4";

const HeroSection = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 min-w-full min-h-full w-auto h-auto object-cover z-0"
      >
        <source src={heroBg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Optional: Add overlay for better text visibility */}
      <div className="absolute top-0 left-0 w-full h-full  z-10"></div>

      {/* Content Overlay */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <div className="backdrop-blur-md bg-black/10 rounded-xl p-8 border border-white/90 shadow-lg">
          <h1 className="text-5xl font-bold mb-4">Welcome to Health Vault</h1>
          <p className="text-xl mb-8">
            Your comprehensive healthcare platform for managing appointments,{" "}
            <br />
            lab tests, pharmacy services, and medical records.
          </p>
          <button className="bg-blue-500 hover:bg-blue-700 px-6 py-3 rounded-lg text-lg transition-colors shadow-md">
            Check In
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
