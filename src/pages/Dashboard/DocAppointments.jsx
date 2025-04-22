import { useState, useEffect } from "react";
import { Calendar, Clock, X, Edit, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

const DocAppointments = () => {
  // State for tracking view mode (week/month)
  const [viewMode, setViewMode] = useState("week");
  
  // State for current date range
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // State for appointments
  const [appointments, setAppointments] = useState([]);
  
  // State for modal
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [note, setNote] = useState("");
  
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  // Mock data for appointments
  useEffect(() => {
    // In a real app, this would be an API call
    const mockAppointments = [
      {
        id: 1,
        patientName: "John Doe",
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1, 10, 0),
        duration: 30,
        status: "confirmed",
        type: "Check-up",
        note: ""
      },
      {
        id: 2,
        patientName: "Jane Smith",
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 2, 14, 30),
        duration: 45,
        status: "confirmed",
        type: "Follow-up",
        note: ""
      },
      {
        id: 3,
        patientName: "Robert Johnson",
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 3, 9, 15),
        duration: 60,
        status: "confirmed",
        type: "Consultation",
        note: ""
      },
      {
        id: 4,
        patientName: "Emily Chen",
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 4, 13, 0),
        duration: 30,
        status: "confirmed",
        type: "Check-up",
        note: ""
      },
      {
        id: 5,
        patientName: "Michael Brown",
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 8, 11, 30),
        duration: 45,
        status: "confirmed",
        type: "New Patient",
        note: ""
      }
    ];
    
    setAppointments(mockAppointments);
  }, [currentDate]);

  // Extract unique appointment types for filtering
  const appointmentTypes = ["All", ...new Set(appointments.map(apt => apt.type))];

  // Helper functions for date manipulation
  const getWeekDates = () => {
    const dates = [];
    const day = currentDate.getDay(); // 0 = Sunday, 6 = Saturday
    const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    const monday = new Date(new Date(currentDate).setDate(diff));
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      dates.push(date);
    }
    
    return dates;
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Generate calendar days for the month view
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    // Create array of day objects
    const days = [];
    
    // Add empty slots for days before the first of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push({ day: null, appointments: [] });
    }
    
    // Add all days in the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      
      // Find appointments for this day
      const dayAppointments = appointments.filter(apt => {
        const aptDate = new Date(apt.date);
        return (
          aptDate.getDate() === day &&
          aptDate.getMonth() === month &&
          aptDate.getFullYear() === year
        );
      });
      
      days.push({
        day,
        appointments: dayAppointments,
        isToday:
          day === new Date().getDate() &&
          month === new Date().getMonth() &&
          year === new Date().getFullYear(),
      });
    }
    
    return days;
  };

  // Navigation functions
  const goToPrevious = () => {
    const newDate = new Date(currentDate);
    if (viewMode === "week") {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  const goToNext = () => {
    const newDate = new Date(currentDate);
    if (viewMode === "week") {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Format dates for display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  // Appointment actions
  const viewAppointmentDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setNote(appointment.note);
    setShowModal(true);
  };

  const handleCancelAppointment = () => {
    // In a real app, this would be an API call
    const updatedAppointments = appointments.map(apt => 
      apt.id === selectedAppointment.id 
        ? { ...apt, status: "cancelled", note: note } 
        : apt
    );
    
    setAppointments(updatedAppointments);
    setShowModal(false);
    alert("Appointment cancelled successfully");
  };

  const handleRescheduleAppointment = () => {
    // In a real app, this would open another modal with date/time picker
    // For now, we'll just show an alert
    alert("Reschedule functionality would open a date/time picker here");
  };

  // Function to create and download an iCalendar file (adapted from library code)
  const addToCalendar = (appointment) => {
    const startDate = new Date(appointment.date);
    const endDate = new Date(appointment.date);
    endDate.setMinutes(endDate.getMinutes() + appointment.duration);

    // Format dates for iCalendar
    const formatDateForICal = (date) => {
      return date.toISOString().replace(/-|:|\.\d+/g, "");
    };

    // Generate a random UID
    const uid = Math.random().toString(36).substring(2) + "@doctorappointments.com";

    // Create iCalendar content
    const icalContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//DoctorAppointments//Calendar//EN",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTAMP:${formatDateForICal(new Date())}`,
      `DTSTART:${formatDateForICal(startDate)}`,
      `DTEND:${formatDateForICal(endDate)}`,
      `SUMMARY:${appointment.type} with Dr. Smith`,
      `DESCRIPTION:Appointment with ${appointment.patientName}`,
      `LOCATION:Medical Center`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    // Create a blob and download link
    const blob = new Blob([icalContent], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `appointment-${appointment.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter appointments for the week view
  const getAppointmentsForDate = (date) => {
    return appointments.filter(apt => {
      const aptDate = new Date(apt.date);
      return aptDate.getDate() === date.getDate() && 
             aptDate.getMonth() === date.getMonth() && 
             aptDate.getFullYear() === date.getFullYear();
    });
  };

  // Filter appointments based on search and filter criteria
  const filteredAppointments = appointments.filter(appointment => {
    const matchesFilter = activeFilter === "All" || appointment.type === activeFilter;
    const matchesSearch = 
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Render weekly view
  const renderWeekView = () => {
    const weekDates = getWeekDates();
    
    return (
      <div className="grid grid-cols-7 gap-4 mt-4">
        {weekDates.map((date, index) => (
          <div key={index} className="border rounded shadow-sm">
            <div className={`p-2 text-center font-semibold ${
              date.toDateString() === new Date().toDateString() ? 'bg-blue-500 text-white' : 'bg-gray-100'
            }`}>
              {formatDate(date)}
            </div>
            <div className="p-2 min-h-64 max-h-96 overflow-y-auto">
              {getAppointmentsForDate(date).map(appointment => (
                <div 
                  key={appointment.id} 
                  className={`p-2 mb-2 rounded cursor-pointer ${
                    appointment.status === 'cancelled' ? 'bg-red-100' : 'bg-blue-100'
                  }`}
                  onClick={() => viewAppointmentDetails(appointment)}
                >
                  <div className="font-semibold">{formatTime(appointment.date)}</div>
                  <div>{appointment.patientName}</div>
                  <div className="text-sm text-gray-600">{appointment.type}</div>
                  {appointment.status === 'cancelled' && (
                    <span className="text-sm text-red-600">Cancelled</span>
                  )}
                </div>
              ))}
              {getAppointmentsForDate(date).length === 0 && (
                <div className="text-center text-gray-500 py-4">No appointments</div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Render monthly view (using approach from library code)
  const renderMonthView = () => {
    const calendarDays = generateCalendarDays();
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-center text-gray-800">
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-1">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="text-center font-semibold text-gray-500 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((dayObj, index) => (
            <div
              key={index}
              className={`min-h-24 border rounded p-1 ${
                dayObj.isToday
                  ? "bg-blue-50 border-blue-300"
                  : "border-gray-200"
              } ${!dayObj.day ? "bg-gray-50" : ""}`}
            >
              {dayObj.day && (
                <>
                  <div
                    className={`text-right ${
                      dayObj.isToday ? "font-bold text-blue-600" : ""
                    }`}
                  >
                    {dayObj.day}
                  </div>
                  <div className="mt-1 space-y-1">
                    {dayObj.appointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className={`text-xs p-1 rounded cursor-pointer truncate ${
                          appointment.status === 'cancelled' ? 'bg-red-100' : 'bg-blue-100'
                        }`}
                        title={appointment.patientName}
                        onClick={() => viewAppointmentDetails(appointment)}
                      >
                        {formatTime(appointment.date)} - {appointment.patientName}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render list view of appointments
  const renderListView = () => {
    return (
      <div className="space-y-4 mt-6">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-800">
                    {appointment.patientName}
                  </h2>
                  <span className={`inline-block ${
                    appointment.status === 'cancelled' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-blue-100 text-blue-800'
                  } text-sm font-medium px-3 py-1 rounded-full`}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 mb-4 text-gray-600">
                  <div className="flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    {formatDate(appointment.date)}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {formatTime(appointment.date)} ({appointment.duration} min)
                  </div>
                  <div className="flex items-center">
                    <span className="inline-block bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
                      {appointment.type}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => viewAppointmentDetails(appointment)}
                    className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => addToCalendar(appointment)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Add to Calendar
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <Calendar />
            </div>
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No appointments found
            </h3>
            <p className="mt-1 text-gray-500">
              Try changing your search or filter criteria.
            </p>
            <div className="mt-6">
              <button
                onClick={() => {
                  setActiveFilter("All");
                  setSearchTerm("");
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Clear filters
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Doctor Appointments</h1>
        <div className="flex space-x-2">
          <button 
            onClick={() => setViewMode("list")} 
            className={`px-4 py-2 rounded ${
              viewMode === "list" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            List
          </button>
          <button 
            onClick={() => setViewMode("week")} 
            className={`px-4 py-2 rounded ${
              viewMode === "week" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Week
          </button>
          <button 
            onClick={() => setViewMode("month")} 
            className={`px-4 py-2 rounded ${
              viewMode === "month" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Month
          </button>
        </div>
      </div>
      
      {/* Filters and Search - Adapted from library code */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {appointmentTypes.map((type) => (
              <button
                key={type}
                onClick={() => setActiveFilter(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${
                  activeFilter === type
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="absolute right-3 top-2.5 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      
      {/* Calendar Navigation */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <button onClick={goToPrevious} className="p-2 rounded hover:bg-gray-100">
            <ChevronLeft size={20} />
          </button>
          <button onClick={goToToday} className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200">
            Today
          </button>
          <button onClick={goToNext} className="p-2 rounded hover:bg-gray-100">
            <ChevronRight size={20} />
          </button>
        </div>
        
        <h2 className="text-lg font-semibold">
          {viewMode === "week" 
            ? `Week of ${getWeekDates()[0].toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`
            : viewMode === "month"
              ? currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
              : "All Appointments"
          }
        </h2>
      </div>
      
      {/* Render the appropriate view */}
      {viewMode === "week" && renderWeekView()}
      {viewMode === "month" && renderMonthView()}
      {viewMode === "list" && renderListView()}
      
      {/* Modal for appointment details */}
      {showModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Appointment Details</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 mr-2 flex-shrink-0 flex items-center justify-center">
                  <CalendarIcon size={20} className="text-blue-500" />
                </div>
                <div>
                  <div className="font-semibold">Date & Time</div>
                  <div>{formatDate(selectedAppointment.date)} at {formatTime(selectedAppointment.date)}</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 mr-2 flex-shrink-0 flex items-center justify-center">
                  <Clock size={20} className="text-blue-500" />
                </div>
                <div>
                  <div className="font-semibold">Duration</div>
                  <div>{selectedAppointment.duration} minutes</div>
                </div>
              </div>
              
              <div>
                <div className="font-semibold">Patient</div>
                <div>{selectedAppointment.patientName}</div>
              </div>
              
              <div>
                <div className="font-semibold">Type</div>
                <div>{selectedAppointment.type}</div>
              </div>
              
              <div>
                <div className="font-semibold">Status</div>
                <div className={selectedAppointment.status === 'cancelled' ? 'text-red-600' : 'text-green-600'}>
                  {selectedAppointment.status.charAt(0).toUpperCase() + selectedAppointment.status.slice(1)}
                </div>
              </div>
              
              <div>
                <label className="font-semibold block mb-2">Notes</label>
                <textarea
                  className="w-full p-2 border rounded"
                  rows="3"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add notes here..."
                ></textarea>
              </div>
              
              <div className="flex flex-wrap justify-end gap-2 mt-6">
                {selectedAppointment.status !== 'cancelled' && (
                  <>
                    <button 
                      onClick={() => addToCalendar(selectedAppointment)}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center"
                    >
                      <Calendar size={16} className="mr-1" /> Add to Calendar
                    </button>
                    <button 
                      onClick={handleRescheduleAppointment}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
                    >
                      <Edit size={16} className="mr-1" /> Reschedule
                    </button>
                    <button 
                      onClick={handleCancelAppointment}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center"
                    >
                      <X size={16} className="mr-1" /> Cancel
                    </button>
                  </>
                )}
                <button 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocAppointments;