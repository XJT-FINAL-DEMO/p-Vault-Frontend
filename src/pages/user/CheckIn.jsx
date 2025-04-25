
import { useState } from "react";
import {
  Search,
  Hospital,
  Calendar,
  Clock,
  FileText,
  MapPin,
  ChevronRight,
  AlertCircle,
  Check,
  X,
  ChevronLeft,
  ChevronUp,
} from "lucide-react";

// Mock data for hospitals
const HOSPITALS = [
  {
    id: 1,
    name: "Central Hospital",
    address: "123 Main Street, Accra",
    distance: "2.3 km",
    specializations: ["General Medicine", "Cardiology", "Pediatrics"],
    waitTime: "25 min",
    rating: 4.7,
  },
  {
    id: 2,
    name: "Korle Bu Teaching Hospital",
    address: "45 Hospital Road, Accra",
    distance: "5.1 km",
    specializations: ["Surgery", "Oncology", "Neurology"],
    waitTime: "40 min",
    rating: 4.5,
  },
  {
    id: 3,
    name: "Ridge Hospital",
    address: "78 Ridge Avenue, Accra",
    distance: "3.5 km",
    specializations: ["Obstetrics", "Gynecology", "Orthopedics"],
    waitTime: "15 min",
    rating: 4.8,
  },
];

// Form fields for pre-check-in
const FORM_FIELDS = [
  { id: "fullName", label: "Full Name", type: "text", required: true },
  { id: "dob", label: "Date of Birth", type: "date", required: true },
  { id: "phone", label: "Phone Number", type: "tel", required: true },
  { id: "email", label: "Email Address", type: "email", required: true },
  { id: "idNumber", label: "ID Number", type: "text", required: true },
  {
    id: "insurance",
    label: "Insurance Provider",
    type: "text",
    required: false,
  },
  {
    id: "policyNumber",
    label: "Insurance Policy Number",
    type: "text",
    required: false,
  },
  {
    id: "emergencyContact",
    label: "Emergency Contact Name",
    type: "text",
    required: true,
  },
  {
    id: "emergencyPhone",
    label: "Emergency Contact Phone",
    type: "tel",
    required: true,
  },
  { id: "reason", label: "Reason for Visit", type: "textarea", required: true },
  {
    id: "symptoms",
    label: "Current Symptoms (if any)",
    type: "textarea",
    required: false,
  },
  {
    id: "allergies",
    label: "Known Allergies",
    type: "textarea",
    required: false,
  },
  {
    id: "medications",
    label: "Current Medications",
    type: "textarea",
    required: false,
  },
];

// Arrival steps for guidance
const ARRIVAL_STEPS = [
  {
    title: "Arrive at Hospital",
    description: "Show your digital queue number at the reception desk.",
    documents: ["Digital Queue Number", "ID Card"],
    location: "Main Entrance",
  },
  {
    title: "Registration Confirmation",
    description:
      "The receptionist will confirm your pre-registration and assign a doctor.",
    documents: ["Pre-Check-In Confirmation"],
    location: "Reception Area",
  },
  {
    title: "Vital Signs",
    description:
      "A nurse will record your vital signs before your consultation.",
    documents: [],
    location: "Nurse Station",
  },
  {
    title: "Wait for Consultation",
    description: "Proceed to the waiting area until your number is called.",
    documents: [],
    location: "Waiting Area",
  },
  {
    title: "Doctor Consultation",
    description: "Meet with your assigned doctor for your consultation.",
    documents: ["Medical History (if available)"],
    location: "Consultation Room",
  },
];

// Modal component for the arrival guide
function ArrivalGuideModal({ isOpen, onClose, selectedHospital, currentStep = 0 }) {
  const [activeStep, setActiveStep] = useState(currentStep);
  
  if (!isOpen) return null;
  
  const handlePrevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };
  
  const handleNextStep = () => {
    if (activeStep < ARRIVAL_STEPS.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };
  
  const progressPercentage = ((activeStep + 1) / ARRIVAL_STEPS.length) * 100;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-full overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            Arrival Guide - {selectedHospital.name}
          </h2>
          <button 
            onClick={onClose}
            className="rounded-full p-1 hover:bg-blue-700 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {/* Progress bar */}
        <div className="px-6 pt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{activeStep + 1} of {ARRIVAL_STEPS.length} steps</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          
          {/* Step indicator */}
          <div className="flex justify-between mt-2 px-1">
            {ARRIVAL_STEPS.map((_, index) => (
              <div 
                key={index}
                onClick={() => setActiveStep(index)}
                className={`flex items-center justify-center h-8 w-8 rounded-full cursor-pointer transition-colors
                  ${index === activeStep 
                    ? 'bg-blue-600 text-white' 
                    : index < activeStep 
                      ? 'bg-blue-100 text-blue-600 border border-blue-600' 
                      : 'bg-gray-100 text-gray-400'
                  }`}
              >
                {index < activeStep ? (
                  <Check className="h-4 w-4" />
                ) : (
                  index + 1
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-blue-800">
              {ARRIVAL_STEPS[activeStep].title}
            </h3>
            <p className="text-gray-600 mt-2">
              {ARRIVAL_STEPS[activeStep].description}
            </p>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <p className="text-sm font-medium text-gray-700">
              Location: <span className="text-blue-700">{ARRIVAL_STEPS[activeStep].location}</span>
            </p>
          </div>
          
          {ARRIVAL_STEPS[activeStep].documents.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-800">Required Documents</h4>
              <ul className="mt-2 space-y-1">
                {ARRIVAL_STEPS[activeStep].documents.map((doc, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {/* Modal Footer */}
        <div className="border-t border-gray-200 p-4 flex justify-between">
          <button
            onClick={handlePrevStep}
            disabled={activeStep === 0}
            className={`flex items-center px-4 py-2 rounded-md ${
              activeStep === 0 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </button>
          
          {activeStep < ARRIVAL_STEPS.length - 1 ? (
            <button
              onClick={handleNextStep}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Done
              <Check className="h-4 w-4 ml-1" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CheckIn() {
  const [activeTab, setActiveTab] = useState("findHospital");
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [queueInfo, setQueueInfo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [specializationFilter, setSpecializationFilter] = useState("");
  const [showArrivalGuide, setShowArrivalGuide] = useState(false);
  const [currentArrivalStep, setCurrentArrivalStep] = useState(0);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    // In a real app, this would submit the form to your backend
    console.log("Form submitted:", formValues);

    // Mock queue number generation
    setQueueInfo({
      queueNumber: "A" + Math.floor(Math.random() * 100),
      estimatedWaitTime: Math.floor(Math.random() * 45) + 15 + " minutes",
      appointmentTime: "2:30 PM",
      checkInCode: "CHK" + Math.floor(Math.random() * 10000),
    });

    setActiveTab("queueSystem");
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prev) => ({ ...prev, [id]: value }));
  };

  const filteredHospitals = HOSPITALS.filter((hospital) => {
    const matchesSearch =
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.address.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSpecialization =
      specializationFilter === "" ||
      hospital.specializations.some((spec) =>
        spec.toLowerCase().includes(specializationFilter.toLowerCase())
      );

    return matchesSearch && matchesSpecialization;
  });

  return (
    <div className="bg-gray-50 min-h-screen pt-16">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">pVault Health Platform</h1>
          <p className="mt-2">Patient Check-In Management System</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex mb-8 bg-white rounded-lg shadow overflow-hidden">
          <button
            onClick={() => setActiveTab("findHospital")}
            className={`flex items-center justify-center px-4 py-3 flex-1 ${
              activeTab === "findHospital"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 hover:bg-blue-50"
            }`}
          >
            <Hospital className="mr-2 h-5 w-5" />
            <span>Find Hospital</span>
          </button>
          <button
            onClick={() => selectedHospital && setActiveTab("preCheckIn")}
            disabled={!selectedHospital}
            className={`flex items-center justify-center px-4 py-3 flex-1 ${
              !selectedHospital
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : activeTab === "preCheckIn"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 hover:bg-blue-50"
            }`}
          >
            <FileText className="mr-2 h-5 w-5" />
            <span>Pre-Check-In</span>
          </button>
          <button
            onClick={() => queueInfo && setActiveTab("queueSystem")}
            disabled={!queueInfo}
            className={`flex items-center justify-center px-4 py-3 flex-1 ${
              !queueInfo
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : activeTab === "queueSystem"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 hover:bg-blue-50"
            }`}
          >
            <Clock className="mr-2 h-5 w-5" />
            <span>Queue System</span>
          </button>
          {/* Removed "Arrival Guide" tab since it's now a modal */}
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Hospital Finder */}
          {activeTab === "findHospital" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Find a Hospital</h2>

              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search hospitals by name or location"
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Filter by Specialization
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={specializationFilter}
                  onChange={(e) => setSpecializationFilter(e.target.value)}
                >
                  <option value="">All Specializations</option>
                  <option value="General Medicine">General Medicine</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Surgery">Surgery</option>
                  <option value="Oncology">Oncology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Obstetrics">Obstetrics</option>
                  <option value="Gynecology">Gynecology</option>
                  <option value="Orthopedics">Orthopedics</option>
                </select>
              </div>

              <div className="space-y-4">
                {filteredHospitals.length > 0 ? (
                  filteredHospitals.map((hospital) => (
                    <div
                      key={hospital.id}
                      className={`border rounded-lg overflow-hidden transition-all ${
                        selectedHospital?.id === hospital.id
                          ? "border-blue-500 ring-2 ring-blue-200"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                      onClick={() => setSelectedHospital(hospital)}
                    >
                      <div className="flex items-center p-4 cursor-pointer">
                        <div className="bg-blue-100 p-3 rounded-full">
                          <Hospital className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="font-semibold text-lg">
                            {hospital.name}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {hospital.address}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {hospital.specializations.map((spec, idx) => (
                              <span
                                key={idx}
                                className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full"
                              >
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-500 text-sm">
                            {hospital.distance}
                          </p>
                          <p className="font-medium">
                            Wait: {hospital.waitTime}
                          </p>
                          <div className="flex items-center justify-end mt-1">
                            <span className="text-yellow-500">★</span>
                            <span className="ml-1">{hospital.rating}</span>
                          </div>
                        </div>
                      </div>
                      {selectedHospital?.id === hospital.id && (
                        <div className="bg-blue-50 p-4 flex justify-between items-center">
                          <span className="text-blue-700 font-medium">
                            Selected for check-in
                          </span>
                          <button
                            onClick={() => setActiveTab("preCheckIn")}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                          >
                            Continue to Pre-Check-In
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">
                      No hospitals found matching your criteria
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Pre-Check-In Form */}
          {activeTab === "preCheckIn" && selectedHospital && (
            <div>
              <h2 className="text-2xl font-bold mb-2">Pre-Check-In Form</h2>
              <p className="text-gray-600 mb-6">For {selectedHospital.name}</p>

              <form onSubmit={handleSubmitForm}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {FORM_FIELDS.map((field) => (
                    <div
                      key={field.id}
                      className={
                        field.type === "textarea" ? "md:col-span-2" : ""
                      }
                    >
                      <label
                        htmlFor={field.id}
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        {field.label}{" "}
                        {field.required && (
                          <span className="text-red-500">*</span>
                        )}
                      </label>

                      {field.type === "textarea" ? (
                        <textarea
                          id={field.id}
                          required={field.required}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          rows={3}
                          value={formValues[field.id] || ""}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <input
                          type={field.type}
                          id={field.id}
                          required={field.required}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={formValues[field.id] || ""}
                          onChange={handleInputChange}
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveTab("findHospital")}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Back to Hospital Selection
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Submit and Get Queue Number
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Queue System */}
          {activeTab === "queueSystem" && queueInfo && (
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Your Queue Information
              </h2>
              <p className="text-gray-600 mb-6">For {selectedHospital.name}</p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-blue-600 text-white text-3xl font-bold">
                    {queueInfo.queueNumber}
                  </div>
                  <h3 className="text-xl font-semibold mt-4">
                    Your Queue Number
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-start">
                      <Clock className="h-6 w-6 text-blue-600 mt-0.5" />
                      <div className="ml-3">
                        <h4 className="font-medium">Estimated Wait Time</h4>
                        <p className="text-gray-700 text-lg">
                          {queueInfo.estimatedWaitTime}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-start">
                      <Calendar className="h-6 w-6 text-blue-600 mt-0.5" />
                      <div className="ml-3">
                        <h4 className="font-medium">Appointment Time</h4>
                        <p className="text-gray-700 text-lg">
                          {queueInfo.appointmentTime}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium flex items-center">
                    <Check className="h-5 w-5 text-green-600 mr-2" />
                    Check-In Code
                  </h4>
                  <p className="text-gray-700 text-lg font-mono mt-1">
                    {queueInfo.checkInCode}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Present this code at the reception desk upon arrival
                  </p>
                </div>

                <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div className="ml-3">
                    <h4 className="font-medium text-yellow-800">
                      Important Information
                    </h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      Please arrive 15 minutes before your appointment time.
                      Your position in the queue may be lost if you're not
                      present when your number is called.
                    </p>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <button
                    onClick={() => setShowArrivalGuide(true)}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    View Arrival Guide
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Arrival Guide Modal */}
      <ArrivalGuideModal 
        isOpen={showArrivalGuide} 
        onClose={() => setShowArrivalGuide(false)}
        selectedHospital={selectedHospital || {}}
        currentStep={currentArrivalStep}
      />
    </div>
  );
}