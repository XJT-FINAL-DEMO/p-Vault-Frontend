import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQSection() {
  const faqs = [
    {
      id: "hospital-finder",
      question: "How does the Hospital Finder work?",
      answer: "Our Hospital Finder tool helps you locate nearby hospitals based on your current location, services offered, and specialization. Simply enter your location or allow location access, and our system will display hospitals sorted by proximity, along with information about available services."
    },
    {
      id: "pre-check-in",
      question: "How does pre-check-in save me time?",
      answer: "With pVault's pre-check-in feature, you can complete all necessary paperwork before arriving at the hospital. This reduces your waiting time significantly as administrative processes are completed in advance. You'll receive a digital queue number and real-time updates on wait times via SMS or email."
    },
    {
      id: "lab-results",
      question: "How can I access my lab test results?",
      answer: "Once your lab tests are complete, you can securely view your results directly through the pVault platform. Simply log in to your account, navigate to the 'Lab Results' section, and all your recent test results will be available. You'll also receive notifications when new results are ready to view."
    },
    {
      id: "pharmacy-services",
      question: "Can I order medications through pVault?",
      answer: "Yes, pVault allows you to upload prescriptions directly to the platform and order medications online. You can choose to have medications delivered to your home or pick them up from a local pharmacy. Our system also provides real-time tracking of your medication orders."
    },
    {
      id: "medical-records",
      question: "How does pVault keep track of my medical history?",
      answer: "pVault's Electronic Health Records (EHR) system creates a comprehensive timeline of all your medical events across different hospitals and clinics. This ensures that your complete medical history is accessible in one place, making it easier for healthcare providers to provide informed care."
    },
    {
      id: "data-security",
      question: "How secure is my data on pVault?",
      answer: "pVault employs industry-leading encryption and security protocols to protect your sensitive medical information. We are fully compliant with healthcare data protection regulations and implement strict access controls. Your data is only accessible to authorized healthcare providers and yourself."
    }
  ];

  return (
    <div className="w-full py-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: false, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-blue-900 mb-4">FAQs</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Frequently Asked Questions: Get Answers to Your Queries about
            Navigating pVault, Scheduling Appointments, and Ensuring Data Security
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4">
          {faqs.map((faq, index) => (
            <FAQItem 
              key={faq.id} 
              faq={faq} 
              index={index} 
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: false, margin: "-50px" }}
          className="mt-10 text-center"
        >
          <a href="#contact" className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300">
            Contact Support
          </a>
        </motion.div>
      </div>
    </div>
  );
}

function FAQItem({ faq, index }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: false, margin: "-50px" }}
      className="border-b border-gray-200 last:border-0"
    >
      <motion.button
        className="w-full py-5 px-4 flex justify-between items-center text-left focus:outline-none rounded-lg hover:bg-blue-50 transition-colors duration-300"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ backgroundColor: "rgba(239, 246, 255, 0.7)" }}
        initial={false}
      >
        <span className="font-semibold text-blue-900">{faq.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="text-blue-500"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M6 9L12 15L18 9" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="pb-5 px-4 text-gray-600">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}