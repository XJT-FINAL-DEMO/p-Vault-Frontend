// import React, { useState, useEffect } from "react";
// import { Calendar, ChevronLeft, ChevronRight, Search, Users, Clipboard, FileText, Activity } from "lucide-react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   BarChart,
//   Bar
// } from "recharts";

// const Overview = () => {
//   // User data state
//   const [userData, setUserData] = useState({
//     firstName: "",
//     lastName: "",
//     role: ""
//   });
  
//   // Fetch user data on component mount
//   useEffect(() => {
//     const loadUserData = () => {
//       try {
//         // Get user data from localStorage
//         const storedUserData = localStorage.getItem("userData");
//         if (storedUserData) {
//           const parsedData = JSON.parse(storedUserData);
//           setUserData(parsedData);
//         }
//       } catch (error) {
//         console.error("Error loading user data:", error);
//       }
//     };
    
//     loadUserData();
//   }, []);

//   // Format full name and title based on role
//   const getDisplayName = () => {
//     if (!userData.firstName && !userData.lastName) return "Dr. Smith"; // Fallback
    
//     const fullName = `${userData.firstName} ${userData.lastName}`;
    
//     // Add title based on role
//     if (userData.role === "doctor") {
//       return `Dr. ${fullName}`;
//     }
//     return fullName;
//   };
  
//   // Get specialty based on role
//   const getSpecialty = () => {
//     switch(userData.role) {
//       case "doctor":
//         return "Physician";
//       case "nurse":
//         return "Registered Nurse";
//       case "labTech":
//         return "Lab Technician";
//       case "pharmacist":
//         return "Pharmacist";
//       default:
//         return "Healthcare Professional";
//     }
//   };

//   // Date range state and functionality
//   const [dateRange, setDateRange] = useState({
//     startDate: new Date(new Date().setDate(new Date().getDate() - 7)),
//     endDate: new Date(),
//   });
//   const [showDatePicker, setShowDatePicker] = useState(false);

//   // Format dates for display
//   const formatDate = (date) => {
//     const day = date.getDate();
//     const month = date.toLocaleString("default", { month: "short" });
//     return `${day} ${month}`;
//   };

//   const displayDateRange = `${formatDate(dateRange.startDate)} - ${formatDate(
//     dateRange.endDate
//   )}`;

//   // Handle date navigation
//   const navigateDates = (direction) => {
//     const days = 7; // 1 week
//     setDateRange((prev) => {
//       const startDate = new Date(prev.startDate);
//       const endDate = new Date(prev.endDate);

//       if (direction === "prev") {
//         startDate.setDate(startDate.getDate() - days);
//         endDate.setDate(endDate.getDate() - days);
//       } else {
//         startDate.setDate(startDate.getDate() + days);
//         endDate.setDate(endDate.getDate() + days);
//       }

//       return { startDate, endDate };
//     });
//   };

//   // Stats data
//   const [stats, setStats] = useState([
//     { label: "Total Patients", value: "48", color: "blue", icon: <Users className="h-5 w-5" /> },
//     { label: "Today's Appointments", value: "12", color: "purple", icon: <Calendar className="h-5 w-5" /> },
//     { label: "Lab Results Pending", value: "7", color: "amber", icon: <Clipboard className="h-5 w-5" /> },
//     { label: "Prescriptions Today", value: "9", color: "green", icon: <FileText className="h-5 w-5" /> },
//   ]);

//   // Patient appointment data
//   const [appointmentData, setAppointmentData] = useState([]);
  
//   // Generate appointment data
//   useEffect(() => {
//     const generateAppointmentData = () => {
//       // Get dates between start and end
//       const dates = [];
//       const currentDate = new Date(dateRange.startDate);
//       while (currentDate <= dateRange.endDate) {
//         dates.push(new Date(currentDate));
//         currentDate.setDate(currentDate.getDate() + 1);
//       }

//       // Generate random data for these dates
//       return dates.map((date) => {
//         const weekday = date.toLocaleString("default", { weekday: "short" });
//         return {
//           date: formatDate(date),
//           weekday: weekday,
//           scheduled: Math.floor(Math.random() * 8) + 3,
//           completed: Math.floor(Math.random() * 6) + 2,
//           noShow: Math.floor(Math.random() * 2)
//         };
//       });
//     };

//     // Update appointment data
//     const newData = generateAppointmentData();
//     setAppointmentData(newData);
//   }, [dateRange]);

//   // Upcoming appointments
//   const [upcomingAppointments, setUpcomingAppointments] = useState([
//     {
//       id: 1,
//       patientName: "Jane Doe",
//       time: "10:00 AM",
//       reason: "Follow-up consultation",
//       status: "Confirmed"
//     },
//     {
//       id: 2,
//       patientName: "John Smith",
//       time: "11:30 AM",
//       reason: "Blood pressure review",
//       status: "Checked-in"
//     },
//     {
//       id: 3,
//       patientName: "Mary Johnson",
//       time: "01:15 PM",
//       reason: "Initial consultation",
//       status: "Confirmed"
//     },
//     {
//       id: 4,
//       patientName: "Robert Williams",
//       time: "02:45 PM",
//       reason: "Test results review",
//       status: "Pending"
//     },
//   ]);

//   // Recent patient activity
//   const [recentActivity, setRecentActivity] = useState([
//     {
//       id: 1,
//       patientName: "David Wilson",
//       activity: "Lab results uploaded",
//       detail: "Blood work and lipid panel",
//       time: "1 hour ago"
//     },
//     {
//       id: 2,
//       patientName: "Sarah Evans",
//       activity: "Updated medical history",
//       detail: "Added new allergy information",
//       time: "3 hours ago"
//     },
//     {
//       id: 3,
//       patientName: "Michael Brown",
//       activity: "Requested prescription refill",
//       detail: "Atorvastatin 20mg",
//       time: "Yesterday"
//     }
//   ]);

//   return (
//     <div className="flex flex-col p-4 md:p-6 m-auto">
//       {/* Header with Welcome and Date Selector */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//         <div className="flex items-center">
//           <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl mr-4">
//             {userData.firstName ? userData.firstName.charAt(0) : "U"}
//           </div>
//           <div>
//             <h1 className="text-xl md:text-2xl font-semibold">
//               Welcome, {getDisplayName()} 👋
//             </h1>
//             <p className="text-gray-600 text-sm md:text-base">
//               {getSpecialty()} | pVault Medical Platform
//             </p>
//           </div>
//         </div>

//         <div className="relative">
//           <div
//             className="flex items-center border rounded-md px-3 py-2 cursor-pointer hover:bg-gray-50"
//             onClick={() => setShowDatePicker(!showDatePicker)}
//           >
//             <button
//               className="mr-2 p-1 hover:bg-gray-200 rounded-full"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 navigateDates("prev");
//               }}
//             >
//               <ChevronLeft className="h-4 w-4" />
//             </button>
//             <span className="text-gray-700">{displayDateRange}</span>
//             <button
//               className="mx-2 p-1 hover:bg-gray-200 rounded-full"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 navigateDates("next");
//               }}
//             >
//               <ChevronRight className="h-4 w-4" />
//             </button>
//             <Calendar className="h-4 w-4 text-gray-500" />
//           </div>

//           {/* Date picker dropdown could go here */}
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         {stats.map((stat, index) => (
//           <div
//             key={index}
//             className={`rounded-md p-4 ${
//               stat.color === "blue"
//                 ? "bg-blue-50"
//                 : stat.color === "purple"
//                 ? "bg-purple-50"
//                 : stat.color === "amber"
//                 ? "bg-amber-50"
//                 : "bg-green-50"
//             }`}
//           >
//             <div className="flex items-center mb-2">
//               <div className={`p-2 rounded-full ${
//                   stat.color === "blue"
//                     ? "bg-blue-100 text-blue-600"
//                     : stat.color === "purple"
//                     ? "bg-purple-100 text-purple-600"
//                     : stat.color === "amber"
//                     ? "bg-amber-100 text-amber-600"
//                     : "bg-green-100 text-green-600"
//                 }`}>
//                 {stat.icon}
//               </div>
//             </div>
//             <div
//               className={`text-sm ${
//                 stat.color === "blue"
//                   ? "text-blue-600"
//                   : stat.color === "purple"
//                   ? "text-purple-600"
//                   : stat.color === "amber"
//                   ? "text-amber-600"
//                   : "text-green-600"
//               }`}
//             >
//               {stat.label}
//             </div>
//             <div className="text-2xl font-bold mt-1">{stat.value}</div>
//           </div>
//         ))}
//       </div>

//       {/* Main Content - Two Column Layout */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
//         {/* Left Column - Patient Appointments Chart */}
//         <div className="lg:col-span-2">
//           <div className="bg-white rounded-md border p-4 mb-6">
//             <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
//               <h2 className="font-medium">Patient Appointments</h2>
//               <div className="flex flex-wrap gap-3">
//                 <div className="flex items-center">
//                   <div className="w-3 h-3 rounded-full bg-blue-400 mr-1"></div>
//                   <span className="text-xs text-gray-600">Scheduled</span>
//                 </div>
//                 <div className="flex items-center">
//                   <div className="w-3 h-3 rounded-full bg-green-400 mr-1"></div>
//                   <span className="text-xs text-gray-600">Completed</span>
//                 </div>
//                 <div className="flex items-center">
//                   <div className="w-3 h-3 rounded-full bg-red-400 mr-1"></div>
//                   <span className="text-xs text-gray-600">No-Show</span>
//                 </div>
//               </div>
//             </div>

//             <div className="h-64 md:h-72">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart
//                   data={appointmentData}
//                   margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//                   barGap={0}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                   <XAxis dataKey="date" tick={{ fontSize: 12 }} />
//                   <YAxis tick={{ fontSize: 12 }} width={40} />
//                   <Tooltip
//                     contentStyle={{
//                       backgroundColor: "white",
//                       border: "1px solid #e0e0e0",
//                       borderRadius: "4px",
//                       fontSize: "12px",
//                     }}
//                   />
//                   <Legend wrapperStyle={{ fontSize: "12px" }} />
//                   <Bar dataKey="scheduled" fill="#3b82f6" name="Scheduled" />
//                   <Bar dataKey="completed" fill="#10b981" name="Completed" />
//                   <Bar dataKey="noShow" fill="#ef4444" name="No-Show" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* Patient activity chart */}
//           <div className="bg-white rounded-md border p-4">
//             <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
//               <h2 className="font-medium">Patient Visit Duration</h2>
//             </div>

//             <div className="h-64">
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart
//                   data={appointmentData.map(day => ({
//                     date: day.date,
//                     avgDuration: Math.floor(Math.random() * 15) + 10,
//                     targetDuration: 15
//                   }))}
//                   margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                   <XAxis dataKey="date" tick={{ fontSize: 12 }} />
//                   <YAxis tick={{ fontSize: 12 }} width={40} label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
//                   <Tooltip
//                     contentStyle={{
//                       backgroundColor: "white",
//                       border: "1px solid #e0e0e0",
//                       borderRadius: "4px",
//                       fontSize: "12px",
//                     }}
//                   />
//                   <Legend wrapperStyle={{ fontSize: "12px" }} />
//                   <Line
//                     type="monotone"
//                     dataKey="avgDuration"
//                     stroke="#8b5cf6"
//                     strokeWidth={2}
//                     name="Avg. Visit Duration"
//                     dot={{ r: 3 }}
//                   />
//                   <Line
//                     type="monotone"
//                     dataKey="targetDuration"
//                     stroke="#94a3b8"
//                     strokeWidth={2}
//                     strokeDasharray="5 5"
//                     name="Target Duration"
//                     dot={false}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>

//         {/* Right Column - Today's Schedule */}
//         <div className="lg:col-span-1">
//           {/* Upcoming appointments today */}
//           <div className="bg-white rounded-md border p-4 mb-6">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="font-medium">Today's Schedule</h2>
//               <button className="text-blue-500 text-sm">View All</button>
//             </div>

//             <div className="divide-y">
//               {upcomingAppointments.map((appointment) => (
//                 <div key={appointment.id} className="py-3">
//                   <div className="flex justify-between items-start mb-1">
//                     <div className="font-medium">{appointment.patientName}</div>
//                     <div className="text-sm font-medium">
//                       {appointment.time}
//                     </div>
//                   </div>
//                   <div className="text-sm text-gray-500 mb-1">{appointment.reason}</div>
//                   <div className="flex justify-between items-center">
//                     <span className={`text-xs px-2 py-1 rounded-full ${
//                       appointment.status === "Confirmed"
//                         ? "bg-blue-100 text-blue-600"
//                         : appointment.status === "Checked-in"
//                         ? "bg-green-100 text-green-600"
//                         : "bg-gray-100 text-gray-600"
//                     }`}>
//                       {appointment.status}
//                     </span>
//                     <button className="text-xs text-blue-500">View details</button>
//                   </div>
//                 </div>
//               ))}

//               {upcomingAppointments.length === 0 && (
//                 <div className="py-8 text-center text-gray-500">
//                   No appointments scheduled for today
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Recent patient activity */}
//           <div className="bg-white rounded-md border p-4">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="font-medium">Recent Patient Activity</h2>
//               <button className="text-blue-500 text-sm">View All</button>
//             </div>

//             <div className="divide-y">
//               {recentActivity.map((activity) => (
//                 <div key={activity.id} className="py-3">
//                   <div className="flex justify-between items-start mb-1">
//                     <div className="font-medium">{activity.patientName}</div>
//                     <div className="text-xs text-gray-500">{activity.time}</div>
//                   </div>
//                   <div className="text-sm mb-1">
//                     <span className="text-blue-600">{activity.activity}</span>
//                   </div>
//                   <div className="text-sm text-gray-500">{activity.detail}</div>
//                 </div>
//               ))}

//               {recentActivity.length === 0 && (
//                 <div className="py-8 text-center text-gray-500">
//                   No recent patient activity
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="bg-white rounded-md border p-4">
//         <h2 className="font-medium mb-4">Quick Actions</h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <button className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-md hover:bg-blue-100 transition">
//             <Users className="h-6 w-6 text-blue-600 mb-2" />
//             <span className="text-sm text-center">View Patients</span>
//           </button>
//           <button className="flex flex-col items-center justify-center p-4 bg-purple-50 rounded-md hover:bg-purple-100 transition">
//             <Calendar className="h-6 w-6 text-purple-600 mb-2" />
//             <span className="text-sm text-center">Schedule Patient</span>
//           </button>
//           <button className="flex flex-col items-center justify-center p-4 bg-amber-50 rounded-md hover:bg-amber-100 transition">
//             <Clipboard className="h-6 w-6 text-amber-600 mb-2" />
//             <span className="text-sm text-center">Lab Results</span>
//           </button>
//           <button className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-md hover:bg-green-100 transition">
//             <FileText className="h-6 w-6 text-green-600 mb-2" />
//             <span className="text-sm text-center">Write Prescription</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Overview;

import React, { useState, useEffect } from "react";
import { Calendar, ChevronLeft, ChevronRight, Search, Users, Clipboard, FileText, Activity } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

const Overview = () => {
  // User data state
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    role: ""
  });
  
  // Fetch user data on component mount
  useEffect(() => {
    const loadUserData = () => {
      try {
        // Get user data from localStorage
        const storedUserData = localStorage.getItem("userData");
        console.log("Raw stored user data:", storedUserData);
        
        if (storedUserData) {
          const parsedData = JSON.parse(storedUserData);
          console.log("Parsed user data:", parsedData);
          setUserData(parsedData);
        } else {
          console.warn("No user data found in localStorage");
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };
    
    loadUserData();
  }, []);

  // Format full name and title based on role
  const getDisplayName = () => {
    console.log("Getting display name for:", userData);
    
    // For debugging - always show what we're working with
    const firstName = userData?.firstName || "";
    const lastName = userData?.lastName || "";
    const role = userData?.role || "";
    
    console.log(`Name components: First(${firstName}), Last(${lastName}), Role(${role})`);
    
    // If no name data, return fallback
    if (!firstName && !lastName) {
      console.log("Using fallback name");
      return "Dr. Smith";
    }
    
    const fullName = `${firstName} ${lastName}`.trim();
    
    // Add title based on role
    if (role === "doctor") {
      return `Dr. ${fullName}`;
    }
    return fullName;
  };
  
  // Get specialty based on role
  const getSpecialty = () => {
    switch(userData.role) {
      case "doctor":
        return "cardiologist";
      case "nurse":
        return "Registered Nurse";
      case "labTech":
        return "Lab Technician";
      case "pharmacist":
        return "Pharmacist";
      default:
        return "Healthcare Professional";
    }
  };

  // Date range state and functionality
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 7)),
    endDate: new Date(),
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Format dates for display
  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    return `${day} ${month}`;
  };

  const displayDateRange = `${formatDate(dateRange.startDate)} - ${formatDate(
    dateRange.endDate
  )}`;

  // Handle date navigation
  const navigateDates = (direction) => {
    const days = 7; // 1 week
    setDateRange((prev) => {
      const startDate = new Date(prev.startDate);
      const endDate = new Date(prev.endDate);

      if (direction === "prev") {
        startDate.setDate(startDate.getDate() - days);
        endDate.setDate(endDate.getDate() - days);
      } else {
        startDate.setDate(startDate.getDate() + days);
        endDate.setDate(endDate.getDate() + days);
      }

      return { startDate, endDate };
    });
  };

  // Stats data
  const [stats, setStats] = useState([
    { label: "Total Patients", value: "48", color: "blue", icon: <Users className="h-5 w-5" /> },
    { label: "Today's Appointments", value: "12", color: "purple", icon: <Calendar className="h-5 w-5" /> },
    { label: "Lab Results Pending", value: "7", color: "amber", icon: <Clipboard className="h-5 w-5" /> },
    { label: "Prescriptions Today", value: "9", color: "green", icon: <FileText className="h-5 w-5" /> },
  ]);

  // Patient appointment data
  const [appointmentData, setAppointmentData] = useState([]);
  
  // Generate appointment data
  useEffect(() => {
    const generateAppointmentData = () => {
      // Get dates between start and end
      const dates = [];
      const currentDate = new Date(dateRange.startDate);
      while (currentDate <= dateRange.endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }

      // Generate random data for these dates
      return dates.map((date) => {
        const weekday = date.toLocaleString("default", { weekday: "short" });
        return {
          date: formatDate(date),
          weekday: weekday,
          scheduled: Math.floor(Math.random() * 8) + 3,
          completed: Math.floor(Math.random() * 6) + 2,
          noShow: Math.floor(Math.random() * 2)
        };
      });
    };

    // Update appointment data
    const newData = generateAppointmentData();
    setAppointmentData(newData);
  }, [dateRange]);

  // Upcoming appointments
  const [upcomingAppointments, setUpcomingAppointments] = useState([
    {
      id: 1,
      patientName: "Paa Kwesi",
      time: "10:00 AM",
      reason: "Follow-up consultation",
      status: "Confirmed"
    },
    {
      id: 2,
      patientName: "Jennifer Arthur",
      time: "11:30 AM",
      reason: "Blood pressure review",
      status: "Checked-in"
    },
    {
      id: 3,
      patientName: "Kafui Tudzi",
      time: "01:15 PM",
      reason: "Initial consultation",
      status: "Confirmed"
    },
    {
      id: 4,
      patientName: "Charles Opoku",
      time: "02:45 PM",
      reason: "Test results review",
      status: "Pending"
    },
  ]);

  // Recent patient activity
  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      patientName: "Gershon Charway",
      activity: "Lab results uploaded",
      detail: "Blood work and lipid panel",
      time: "1 hour ago"
    },
    {
      id: 2,
      patientName: "Derrick Appiah ",
      activity: "Updated medical history",
      detail: "Added new allergy information",
      time: "3 hours ago"
    },
    {
      id: 3,
      patientName: "Paul Collins",
      activity: "Requested prescription refill",
      detail: "Atorvastatin 20mg",
      time: "Yesterday"
    }
  ]);

  // Get the name to display - computed once and reused
  const displayName = getDisplayName();

  return (
    <div className="flex flex-col p-4 md:p-6 m-auto">
      {/* Header with Welcome and Date Selector */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl mr-4">
            {userData.firstName ? userData.firstName.charAt(0) : "DXA"}
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-semibold">
              Welcome Xvien Asante 👋
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              {getSpecialty()} | pVault Medical Platform
            </p>
          </div>
        </div>

        <div className="relative">
          <div
            className="flex items-center border rounded-md px-3 py-2 cursor-pointer hover:bg-gray-50"
            onClick={() => setShowDatePicker(!showDatePicker)}
          >
            <button
              className="mr-2 p-1 hover:bg-gray-200 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                navigateDates("prev");
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-gray-700">{displayDateRange}</span>
            <button
              className="mx-2 p-1 hover:bg-gray-200 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                navigateDates("next");
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <Calendar className="h-4 w-4 text-gray-500" />
          </div>

          {/* Date picker dropdown could go here */}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`rounded-md p-4 ${
              stat.color === "blue"
                ? "bg-blue-50"
                : stat.color === "purple"
                ? "bg-purple-50"
                : stat.color === "amber"
                ? "bg-amber-50"
                : "bg-green-50"
            }`}
          >
            <div className="flex items-center mb-2">
              <div className={`p-2 rounded-full ${
                  stat.color === "blue"
                    ? "bg-blue-100 text-blue-600"
                    : stat.color === "purple"
                    ? "bg-purple-100 text-purple-600"
                    : stat.color === "amber"
                    ? "bg-amber-100 text-amber-600"
                    : "bg-green-100 text-green-600"
                }`}>
                {stat.icon}
              </div>
            </div>
            <div
              className={`text-sm ${
                stat.color === "blue"
                  ? "text-blue-600"
                  : stat.color === "purple"
                  ? "text-purple-600"
                  : stat.color === "amber"
                  ? "text-amber-600"
                  : "text-green-600"
              }`}
            >
              {stat.label}
            </div>
            <div className="text-2xl font-bold mt-1">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Left Column - Patient Appointments Chart */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-md border p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
              <h2 className="font-medium">Patient Appointments</h2>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-400 mr-1"></div>
                  <span className="text-xs text-gray-600">Scheduled</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-400 mr-1"></div>
                  <span className="text-xs text-gray-600">Completed</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-400 mr-1"></div>
                  <span className="text-xs text-gray-600">No-Show</span>
                </div>
              </div>
            </div>

            <div className="h-64 md:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={appointmentData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  barGap={0}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} width={40} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e0e0e0",
                      borderRadius: "4px",
                      fontSize: "12px",
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <Bar dataKey="scheduled" fill="#3b82f6" name="Scheduled" />
                  <Bar dataKey="completed" fill="#10b981" name="Completed" />
                  <Bar dataKey="noShow" fill="#ef4444" name="No-Show" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Patient activity chart */}
          <div className="bg-white rounded-md border p-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
              <h2 className="font-medium">Patient Visit Duration</h2>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={appointmentData.map(day => ({
                    date: day.date,
                    avgDuration: Math.floor(Math.random() * 15) + 10,
                    targetDuration: 15
                  }))}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} width={40} label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e0e0e0",
                      borderRadius: "4px",
                      fontSize: "12px",
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <Line
                    type="monotone"
                    dataKey="avgDuration"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    name="Avg. Visit Duration"
                    dot={{ r: 3 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="targetDuration"
                    stroke="#94a3b8"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Target Duration"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column - Today's Schedule */}
        <div className="lg:col-span-1">
          {/* Upcoming appointments today */}
          <div className="bg-white rounded-md border p-4 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-medium">Today's Schedule</h2>
              <button className="text-blue-500 text-sm">View All</button>
            </div>

            <div className="divide-y">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="py-3">
                  <div className="flex justify-between items-start mb-1">
                    <div className="font-medium">{appointment.patientName}</div>
                    <div className="text-sm font-medium">
                      {appointment.time}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 mb-1">{appointment.reason}</div>
                  <div className="flex justify-between items-center">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      appointment.status === "Confirmed"
                        ? "bg-blue-100 text-blue-600"
                        : appointment.status === "Checked-in"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {appointment.status}
                    </span>
                    <button className="text-xs text-blue-500">View details</button>
                  </div>
                </div>
              ))}

              {upcomingAppointments.length === 0 && (
                <div className="py-8 text-center text-gray-500">
                  No appointments scheduled for today
                </div>
              )}
            </div>
          </div>

          {/* Recent patient activity */}
          <div className="bg-white rounded-md border p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-medium">Recent Patient Activity</h2>
              <button className="text-blue-500 text-sm">View All</button>
            </div>

            <div className="divide-y">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="py-3">
                  <div className="flex justify-between items-start mb-1">
                    <div className="font-medium">{activity.patientName}</div>
                    <div className="text-xs text-gray-500">{activity.time}</div>
                  </div>
                  <div className="text-sm mb-1">
                    <span className="text-blue-600">{activity.activity}</span>
                  </div>
                  <div className="text-sm text-gray-500">{activity.detail}</div>
                </div>
              ))}

              {recentActivity.length === 0 && (
                <div className="py-8 text-center text-gray-500">
                  No recent patient activity
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-md border p-4">
        <h2 className="font-medium mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-md hover:bg-blue-100 transition">
            <Users className="h-6 w-6 text-blue-600 mb-2" />
            <span className="text-sm text-center">View Patients</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-purple-50 rounded-md hover:bg-purple-100 transition">
            <Calendar className="h-6 w-6 text-purple-600 mb-2" />
            <span className="text-sm text-center">Schedule Patient</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-amber-50 rounded-md hover:bg-amber-100 transition">
            <Clipboard className="h-6 w-6 text-amber-600 mb-2" />
            <span className="text-sm text-center">Lab Results</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-md hover:bg-green-100 transition">
            <FileText className="h-6 w-6 text-green-600 mb-2" />
            <span className="text-sm text-center">Write Prescription</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Overview;