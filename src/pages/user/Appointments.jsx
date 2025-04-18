import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, X, CheckCircle, AlertCircle } from 'lucide-react';

// Mock data - in a real app this would come from your backend
const MOCK_DOCTORS = [
  { id: 1, name: "Dr. Sarah Johnson", specialty: "Cardiologist", available: true },
  { id: 2, name: "Dr. Michael Chen", specialty: "General Practitioner", available: true },
  { id: 3, name: "Dr. Ama Mensah", specialty: "Pediatrician", available: true },
  { id: 4, name: "Dr. Kofi Ansah", specialty: "Neurologist", available: false },
];

const MOCK_LAB_CENTERS = [
  { id: 1, name: "Central Medical Lab", location: "East Legon", tests: ["Blood Test", "Urinalysis", "X-Ray"] },
  { id: 2, name: "HealthFirst Diagnostics", location: "Osu", tests: ["Full Body Checkup", "COVID Test", "Ultrasound"] },
  { id: 3, name: "AccuLab Testing Center", location: "Tema", tests: ["Blood Chemistry", "Glucose Test", "Thyroid Panel"] },
];

const Appointments = () => {
  // State variables
  const [appointmentType, setAppointmentType] = useState('doctor');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedLabCenter, setSelectedLabCenter] = useState(null);
  const [selectedTest, setSelectedTest] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [purpose, setPurpose] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [rescheduleAppointment, setRescheduleAppointment] = useState(null);
  const [errors, setErrors] = useState({ submit: '' });

  // Time slots
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour < 17; hour++) {
      const hourFormatted = hour > 12 ? hour - 12 : hour;
      const period = hour >= 12 ? 'PM' : 'AM';
      slots.push(`${hourFormatted}:00 ${period}`);
      slots.push(`${hourFormatted}:30 ${period}`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Mock appointments data
  useEffect(() => {
    // In a real app, this would be fetched from your API
    setAppointments([
      { 
        id: 101, 
        type: 'doctor', 
        doctorName: 'Dr. Sarah Johnson', 
        date: '2025-04-24', 
        time: '10:00 AM', 
        purpose: 'Annual checkup', 
        status: 'confirmed' 
      },
      { 
        id: 102, 
        type: 'lab', 
        labName: 'Central Medical Lab', 
        testName: 'Blood Test', 
        date: '2025-04-25', 
        time: '2:30 PM', 
        purpose: 'Regular monitoring', 
        status: 'confirmed' 
      }
    ]);
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({ submit: '' });
    
    // Simulating API call
    setTimeout(() => {
      try {
        // Create new appointment object
        const newAppointment = {
          id: Date.now(),
          type: appointmentType,
          date: selectedDate,
          time: selectedTime,
          purpose: purpose,
          status: 'confirmed'
        };
        
        if (appointmentType === 'doctor') {
          newAppointment.doctorName = MOCK_DOCTORS.find(d => d.id === selectedDoctor)?.name;
        } else {
          newAppointment.labName = MOCK_LAB_CENTERS.find(l => l.id === selectedLabCenter)?.name;
          newAppointment.testName = selectedTest;
        }
        
        if (isRescheduling && rescheduleAppointment) {
          // Update existing appointment
          setAppointments(appointments.map(apt => 
            apt.id === rescheduleAppointment.id ? { ...apt, date: selectedDate, time: selectedTime } : apt
          ));
          setIsRescheduling(false);
          setRescheduleAppointment(null);
        } else {
          // Add new appointment
          setAppointments([...appointments, newAppointment]);
        }
        
        setIsSubmitting(false);
        setSubmitted(true);
        
        // Reset form after 3 seconds
        setTimeout(() => {
          resetForm();
        }, 3000);
      } catch (error) {
        setErrors({ submit: 'Failed to book appointment. Please try again.' });
        setIsSubmitting(false);
      }
    }, 1500);
  };

  const resetForm = () => {
    setAppointmentType('doctor');
    setSelectedDoctor(null);
    setSelectedLabCenter(null);
    setSelectedTest('');
    setSelectedDate('');
    setSelectedTime('');
    setPurpose('');
    setSubmitted(false);
    setErrors({ submit: '' });
  };

  const handleReschedule = (appointment) => {
    setIsRescheduling(true);
    setRescheduleAppointment(appointment);
    setAppointmentType(appointment.type);
    setSelectedDate(appointment.date);
    setSelectedTime(appointment.time);
    setPurpose(appointment.purpose);
    
    if (appointment.type === 'doctor') {
      const doctor = MOCK_DOCTORS.find(d => d.name === appointment.doctorName);
      setSelectedDoctor(doctor?.id);
    } else {
      const lab = MOCK_LAB_CENTERS.find(l => l.name === appointment.labName);
      setSelectedLabCenter(lab?.id);
      setSelectedTest(appointment.testName);
    }
    
    // Scroll to the booking form
    document.getElementById('booking-form').scrollIntoView({ behavior: 'smooth' });
  };

  // Determine if form can be submitted
  const canSubmit = () => {
    if (appointmentType === 'doctor') {
      return selectedDoctor && selectedDate && selectedTime && purpose;
    } else {
      return selectedLabCenter && selectedTest && selectedDate && selectedTime && purpose;
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl pt-24">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-600 p-6 text-white">
          <h1 className="text-2xl font-bold">pVault Healthcare Platform</h1>
          <p className="mt-2">Schedule or manage your appointments with doctors or lab centers</p>
        </div>
        
        {/* Booking Form */}
        <div id="booking-form" className="p-6">
          {submitted ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center mb-6">
              <CheckCircle className="mr-2" size={20} />
              <span>
                {isRescheduling 
                  ? "Your appointment has been successfully rescheduled!" 
                  : "Your appointment has been successfully booked!"}
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="flex">
                <h2 className="text-xl font-semibold mb-4">
                  {isRescheduling ? "Reschedule Appointment" : "Book New Appointment"}
                </h2>
              </div>
              
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  {errors.submit}
                </h3>
              </div>
              
              {!isRescheduling && (
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Appointment Type</label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      className={`flex-1 py-3 px-4 rounded-lg border ${appointmentType === 'doctor' ? 'bg-blue-100 border-blue-500' : 'bg-white border-gray-300'}`}
                      onClick={() => setAppointmentType('doctor')}
                    >
                      <div className="flex items-center justify-center">
                        <User className="mr-2" size={18} />
                        <span>Doctor Visit</span>
                      </div>
                    </button>
                    <button
                      type="button"
                      className={`flex-1 py-3 px-4 rounded-lg border ${appointmentType === 'lab' ? 'bg-blue-100 border-blue-500' : 'bg-white border-gray-300'}`}
                      onClick={() => setAppointmentType('lab')}
                    >
                      <div className="flex items-center justify-center">
                        <span>Lab Test</span>
                      </div>
                    </button>
                  </div>
                </div>
              )}
              
              {appointmentType === 'doctor' && (
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Select Doctor</label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedDoctor || ''}
                    onChange={(e) => setSelectedDoctor(parseInt(e.target.value))}
                    disabled={isRescheduling}
                    required
                  >
                    <option value="">Select a doctor...</option>
                    {MOCK_DOCTORS.map(doctor => (
                      <option key={doctor.id} value={doctor.id} disabled={!doctor.available}>
                        {doctor.name} - {doctor.specialty} {!doctor.available && '(Unavailable)'}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              
              {appointmentType === 'lab' && (
                <>
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Select Lab Center</label>
                    <select
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={selectedLabCenter || ''}
                      onChange={(e) => setSelectedLabCenter(parseInt(e.target.value))}
                      disabled={isRescheduling}
                      required
                    >
                      <option value="">Select a lab center...</option>
                      {MOCK_LAB_CENTERS.map(lab => (
                        <option key={lab.id} value={lab.id}>
                          {lab.name} - {lab.location}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {selectedLabCenter && (
                    <div className="mb-6">
                      <label className="block text-gray-700 text-sm font-bold mb-2">Select Test</label>
                      <select
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={selectedTest}
                        onChange={(e) => setSelectedTest(e.target.value)}
                        disabled={isRescheduling}
                        required
                      >
                        <option value="">Select a test...</option>
                        {MOCK_LAB_CENTERS.find(l => l.id === selectedLabCenter)?.tests.map(test => (
                          <option key={test} value={test}>
                            {test}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </>
              )}
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  <div className="flex items-center">
                    <Calendar className="mr-2" size={18} />
                    <span>Select Date</span>
                  </div>
                </label>
                <input
                  type="date"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  max={new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  <div className="flex items-center">
                    <Clock className="mr-2" size={18} />
                    <span>Select Time</span>
                  </div>
                </label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  required
                >
                  <option value="">Select a time...</option>
                  {timeSlots.map(time => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">Purpose of Visit</label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Briefly describe the reason for your appointment..."
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
                >
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </button>
              </div>
            </form>
          )}
        </div>
        
        {/* Existing Appointments Section */}
        <div className="bg-gray-50 p-6 border-t border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Your Appointments</h2>
          
          {appointments.length === 0 ? (
            <div className="text-gray-500 text-center py-6">
              You have no upcoming appointments.
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map(appointment => (
                <div key={appointment.id} className="bg-white rounded-lg border border-gray-200 p-4 flex justify-between items-center">
                  <div>
                    <div className="font-medium">
                      {appointment.type === 'doctor' ? appointment.doctorName : `${appointment.testName} at ${appointment.labName}`}
                    </div>
                    <div className="text-sm text-gray-600">
                      {appointment.date} at {appointment.time}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Purpose: {appointment.purpose}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {appointment.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                    </span>
                    <button
                      onClick={() => handleReschedule(appointment)}
                      className="ml-4 text-blue-600 hover:text-blue-800"
                    >
                      Reschedule
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointments;