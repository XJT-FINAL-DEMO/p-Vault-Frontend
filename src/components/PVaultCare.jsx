import React from "react";
import { motion } from "framer-motion";
import imageBg from "../assets/images/imagebackground.jpg";
import { Link } from "react-router";

export default function PVaultCare() {
  return (
    <div className="w-full py-16 bg-gray-50 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Text Content */}
          <motion.div
            className="lg:w-1/2 order-2 lg:order-1"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: false, margin: "-100px" }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-4">
              Accessible Medical Care
              <br />
              That Fits Your Schedule
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Don't wait until you feel under the weather. Download pVault now,
              and have medical expertise ready whenever you need it, right in
              your cozy space. Pre-book appointments, access lab results, and
              manage your prescriptions all in one place.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                to="/appointments"
                className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-8 rounded-full transition-colors duration-300 shadow-md"
              >
                Schedule Your Online Visit
              </Link>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            className="lg:w-1/2 order-1 lg:order-2"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: false, margin: "-100px" }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-blue-100 rounded-full opacity-20 blur-3xl transform -rotate-6"></div>
              <motion.img
                src={imageBg}
                alt="Patient accessing healthcare from home"
                className="relative z-10 rounded-2xl shadow-xl w-full max-w-lg mx-auto"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 3,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
