import React, { useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function PVaultFeatures() {
  const { scrollYProgress } = useScroll();
  
  return (
    <div className="w-full py-16 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 z-0"></div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: false, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            The Possibilities of pVault
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore a new horizon of healthcare where convenience meets professionalism.
            pVault enables you to manage appointments, find healthcare services, access
            your medical records, and much more, all at the top of a finger.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Feature 1 */}
          <FeatureCard 
            delay={0.1} 
            direction="left"
            icon={
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            }
            title="Patient Check-In Management"
            description="Schedule pre-check-ins with hospitals, receive digital queue numbers, and get step-by-step arrival guides to streamline your hospital visit experience."
          />

          {/* Feature 2 */}
          <FeatureCard 
            delay={0.1} 
            direction="right"
            icon={
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            }
            title="Lab Testing Centers Integration"
            description="Find nearby lab centers, book appointments directly through our platform, and securely access your test results online once they're ready."
          />

          {/* Feature 3 */}
          <FeatureCard 
            delay={0.2} 
            direction="left"
            icon={
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
            }
            title="Pharmacy Services"
            description="Find nearby pharmacies, browse inventories, upload prescriptions directly to our platform, and track your medication orders in real-time."
          />

          {/* Feature 4 */}
          <FeatureCard 
            delay={0.2} 
            direction="right"
            icon={
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            }
            title="Medical Records Access"
            description="Access your complete medical history across different hospitals with our Electronic Health Records (EHR) system, providing a comprehensive timeline of all medical events."
          />
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: false, margin: "-100px" }}
          className="mt-16 text-center"
        >
          <a href="#signup" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
            Experience pVault Today
          </a>
        </motion.div>
      </div>
      
      {/* Subtle animated gradient overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-blue-100/30 to-transparent opacity-70 z-0"
        style={{
          y: useTransform(scrollYProgress, [0, 1], ["0%", "10%"]),
        }}
      />
    </div>
  );
}

// Reusable Feature Card Component
function FeatureCard({ icon, title, description, delay, direction }) {
  const xValue = direction === "left" ? -30 : 30;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: xValue }}
      whileInView={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: xValue }}
      transition={{ 
        duration: 0.6, 
        delay: delay,
        ease: [0.22, 1, 0.36, 1] 
      }}
      viewport={{ once: false, margin: "-50px" }}
      className="flex gap-6 bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="flex-shrink-0">
        <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-blue-900 mb-2">
          {title}
        </h3>
        <p className="text-gray-600">
          {description}
        </p>
      </div>
    </motion.div>
  );
}