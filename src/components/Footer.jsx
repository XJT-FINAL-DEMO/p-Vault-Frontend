import React from "react";
import {
  Calendar,
  Clock,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full mt-20 bg-white/20 backdrop-blur-lg border border-white/30 shadow-xl rounded-t-lg">
      <div className="max-w-7xl mx-auto px-6 py-16 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand and description */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-3xl font-bold text-white drop-shadow-md">
              Health Vault
            </h2>
            <p className="mt-4 text-white/90 text-lg">
              Your comprehensive healthcare platform for managing appointments,
              lab tests, pharmacy services, and medical records.
            </p>
            <div className="mt-6 flex space-x-5">
              <a
                href="#"
                className="text-white/80 hover:text-white transition-colors"
              >
                <Facebook size={22} />
              </a>
              <a
                href="#"
                className="text-white/80 hover:text-white transition-colors"
              >
                <Twitter size={22} />
              </a>
              <a
                href="#"
                className="text-white/80 hover:text-white transition-colors"
              >
                <Instagram size={22} />
              </a>
              <a
                href="#"
                className="text-white/80 hover:text-white transition-colors"
              >
                <Linkedin size={22} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="col-span-1">
            <h3 className="text-xl font-semibold text-white">Quick Links</h3>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Find a Doctor
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Book Appointment
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Find Lab Centers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Pharmacy Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Medical Records
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-span-1">
            <h3 className="text-xl font-semibold text-white">Our Services</h3>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Patient Check-In
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Lab Testing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Pharmacy Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Medical Records
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Virtual Therapy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div className="col-span-1">
            <h3 className="text-xl font-semibold text-white">Contact Us</h3>
            <ul className="mt-5 space-y-4">
              <li className="flex items-center space-x-3">
                <MapPin size={20} className="text-blue-300" />
                <span className="text-white/90">
                  123 Health Street, Accra, Ghana
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-blue-300" />
                <span className="text-white/90">+233 30 123 4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-blue-300" />
                <span className="text-white/90">contact@healthvault.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Clock size={20} className="text-blue-300" />
                <span className="text-white/90">Mon-Fri: 8:00AM - 6:00PM</span>
              </li>
              <li className="flex items-center space-x-3">
                <Calendar size={20} className="text-blue-300" />
                <span className="text-white/90">Sat: 9:00AM - 1:00PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar with copyright */}
        <div className="mt-16 pt-8 border-t border-white/20">
          <p className="text-center text-white/80 text-sm">
            © {new Date().getFullYear()} Health Vault. All rights reserved.
            Developed by XJT Team.
          </p>
          <div className="mt-4 flex justify-center space-x-8">
            <a
              href="#"
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
