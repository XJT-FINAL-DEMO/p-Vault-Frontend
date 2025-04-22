import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Phone, Mail, FileText, Award, Users, Star, Pencil } from 'lucide-react';

function Profile() {
  const [activeTab, setActiveTab] = useState('about');
  
  // Sample doctor data
  const doctor = {
    name: "Dr. Sarah Mensah",
    specialization: "Cardiologist",
    hospital: "Korle Bu Teaching Hospital",
    location: "Accra, Ghana",
    rating: 4.8,
    reviews: 124,
    patients: 1240,
    experience: 12,
    about: "Dr. Sarah Mensah is a board-certified cardiologist with over 12 years of experience in treating cardiovascular diseases. She specializes in preventive cardiology and heart failure management.",
    education: [
      { degree: "MD", institution: "University of Ghana Medical School", year: "2006-2012" },
      { degree: "Residency in Internal Medicine", institution: "Korle Bu Teaching Hospital", year: "2012-2015" },
      { degree: "Fellowship in Cardiology", institution: "Johns Hopkins Hospital, USA", year: "2015-2018" }
    ],
    contactInfo: {
      email: "dr.mensah@pvault.com",
      phone: "+233 50 123 4567",
      address: "Cardiology Department, Korle Bu Teaching Hospital, Accra"
    },
    schedule: [
      { day: "Monday", hours: "9:00 AM - 2:00 PM" },
      { day: "Wednesday", hours: "10:00 AM - 4:00 PM" },
      { day: "Friday", hours: "9:00 AM - 1:00 PM" }
    ],
    services: [
      "Cardiac Consultation", 
      "ECG Analysis",
      "Heart Disease Risk Assessment",
      "Pacemaker Evaluation",
      "Cardiac Rehabilitation Planning"
    ]
  };

  // Define a minimum height for the content area to prevent layout shifts
  const contentMinHeight = "min-h-64";

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-6xl pt-8">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-start gap-6 border-b pb-6">
        {/* Profile Image */}
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 text-4xl font-bold">
            {doctor.name.split(" ").map(n => n[0]).join("")}
          </div>
          <button className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white">
            <Pencil size={16} />
          </button>
        </div>

        {/* Doctor Info */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{doctor.name}</h1>
              <p className="text-blue-600 font-medium">{doctor.specialization}</p>
              <div className="flex items-center gap-2 text-gray-600 mt-1">
                <MapPin size={16} />
                <span>{doctor.hospital}, {doctor.location}</span>
              </div>
            </div>
            <button className="mt-4 md:mt-0 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
              Book Appointment
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-center mb-1 text-blue-600">
                <Star size={20} />
              </div>
              <p className="font-bold text-lg">{doctor.rating}/5</p>
              <p className="text-sm text-gray-600">{doctor.reviews} Reviews</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-center mb-1 text-blue-600">
                <Users size={20} />
              </div>
              <p className="font-bold text-lg">{doctor.patients}+</p>
              <p className="text-sm text-gray-600">Patients</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-center mb-1 text-blue-600">
                <Award size={20} />
              </div>
              <p className="font-bold text-lg">{doctor.experience} Years</p>
              <p className="text-sm text-gray-600">Experience</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-center mb-1 text-blue-600">
                <FileText size={20} />
              </div>
              <p className="font-bold text-lg">24/7</p>
              <p className="text-sm text-gray-600">Online Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs - Removed the border-b-2 underline and kept just the color indicator */}
      <div className="mt-6 border-b">
        <div className="flex space-x-6">
          <button 
            onClick={() => setActiveTab('about')}
            className={`pb-3 px-1 ${activeTab === 'about' ? 'text-blue-600 font-medium' : 'text-gray-500'}`}
          >
            About
          </button>
          <button 
            onClick={() => setActiveTab('schedule')}
            className={`pb-3 px-1 ${activeTab === 'schedule' ? 'text-blue-600 font-medium' : 'text-gray-500'}`}
          >
            Schedule
          </button>
          <button 
            onClick={() => setActiveTab('services')}
            className={`pb-3 px-1 ${activeTab === 'services' ? 'text-blue-600 font-medium' : 'text-gray-500'}`}
          >
            Services
          </button>
          <button 
            onClick={() => setActiveTab('contact')}
            className={`pb-3 px-1 ${activeTab === 'contact' ? 'text-blue-600 font-medium' : 'text-gray-500'}`}
          >
            Contact
          </button>
        </div>
      </div>

      {/* Tab Content - Added fixed height container */}
      <div className={`mt-6 ${contentMinHeight}`}>
        {activeTab === 'about' && (
          <div>
            <h2 className="text-xl font-semibold mb-3">About</h2>
            <p className="text-gray-700 mb-6">{doctor.about}</p>
            
            <h2 className="text-xl font-semibold mb-3">Education & Training</h2>
            <div className="space-y-4">
              {doctor.education.map((edu, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-lg mr-4">
                    <Award size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.institution}</p>
                    <p className="text-gray-500 text-sm">{edu.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Working Hours</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              {doctor.schedule.map((slot, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <Calendar size={18} className="text-blue-600" />
                    <span className="font-medium">{slot.day}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={18} className="text-blue-600" />
                    <span>{slot.hours}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                <Calendar size={18} />
                Schedule an Appointment
              </button>
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Services Offered</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {doctor.services.map((service, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <FileText size={18} className="text-blue-600" />
                  </div>
                  <span>{service}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Phone size={18} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p>{doctor.contactInfo.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Mail size={18} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p>{doctor.contactInfo.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="bg-blue-100 p-2 rounded-full">
                  <MapPin size={18} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p>{doctor.contactInfo.address}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;