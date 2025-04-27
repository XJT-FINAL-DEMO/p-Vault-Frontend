import { useState } from "react";
import { UserIcon, Stethoscope } from "lucide-react";
import { Link } from "react-router";

const RoleSelection = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome to pVault
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Choose how you want to sign up
          </p>
        </div>

        <div className="mt-8 space-y-4">
          {/* Patient Role */}
          <Link
            to="/patientsignup"
            className="block w-full p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <UserIcon className="h-6 w-6 text-blue-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Sign up as a Patient
                </h3>
                <p className="text-sm text-gray-500">
                  Book appointments and view your medical history
                </p>
              </div>
            </div>
          </Link>

          {/* Doctor Role */}
          <Link
            to="/doctorsignup"
            className="block w-full p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <Stethoscope className="h-6 w-6 text-green-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Sign up as a Doctor
                </h3>
                <p className="text-sm text-gray-500">
                  Access your patient appointments and medical records
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-6 text-center">
          <a
            href="/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Already have an account? Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
