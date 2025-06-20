import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { FiSettings, FiUser, FiEdit2, FiMail, FiPhone, FiArrowRight, FiBell, FiLogOut, FiChevronLeft } from 'react-icons/fi';

const MyAccount = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center pt-20"
      style={{
        backgroundImage: "url('images/background_resized.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center bottom"
      }}
    >
      <Navbar />
      <section>
        <div className="container mx-auto px-6 py-8">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto relative">
            {/* Settings Icon */}
            <button
              className="absolute top-6 right-6 text-2xl text-gray-700 hover:text-black"
              onClick={() => setShowSettings(true)}
              aria-label="Settings"
            >
              <FiSettings />
            </button>
            {/* Profile Photo */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-2 border-gray-300 flex items-center justify-center bg-gray-100">
                  <FiUser className="text-6xl text-gray-400" />
                </div>
                <button className="absolute bottom-2 right-2 bg-white border border-gray-300 rounded-full p-1 hover:bg-gray-100">
                  <FiEdit2 className="text-gray-600 text-lg" />
                </button>
              </div>
              <span className="mt-2 text-sm text-gray-700">Profile Photo</span>
            </div>
            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Name:</label>
                <div className="flex items-center border-b border-gray-300 mb-4">
                  <FiUser className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    className="w-full bg-transparent outline-none py-1"
                    placeholder="Name"
                    value="A Name"
                    readOnly
                  />
                </div>
                <label className="block text-gray-700 font-medium mb-1">Phone Number:</label>
                <div className="flex items-center border-b border-gray-300 mb-6">
                  <FiPhone className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    className="w-full bg-transparent outline-none py-1"
                    placeholder="Phone Number"
                    value="Phone Number"
                    readOnly
                  />
                </div>
                <button className="flex items-center border border-gray-400 rounded-full px-4 py-2 font-medium hover:bg-gray-100 transition">
                  Change Password <FiArrowRight className="ml-2" />
                </button>
              </div>
              {/* Right Column */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Email Address</label>
                <div className="flex items-center border-b border-gray-300 mb-6">
                  <FiMail className="text-gray-400 mr-2" />
                  <input
                    type="email"
                    className="w-full bg-transparent outline-none py-1"
                    placeholder="Email Address"
                    value="email@example.com"
                    readOnly
                  />
                </div>
                <button className="w-32 bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition">
                  Update
                </button>
              </div>
            </div>
            {/* Delete Account */}
            <div className="flex justify-center mt-8">
              <button className="text-red-600 hover:text-red-800 font-medium text-lg">
                Delete my account
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-xl shadow-lg w-[370px] max-w-full">
            {/* Header */}
            <div className="flex items-center justify-center relative border-b px-4 py-4">
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-gray-700 hover:text-black"
                onClick={() => setShowSettings(false)}
                aria-label="Back"
              >
                <FiChevronLeft />
              </button>
              <h2 className="text-xl font-bold text-center flex-1">Settings</h2>
            </div>
            {/* Push Notifications */}
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <div className="flex items-center">
                <FiBell className="mr-2 text-lg" />
                <span className="font-semibold">Push Notifications</span>
              </div>
              <button
                className="text-3xl"
                onClick={() => setPushEnabled(!pushEnabled)}
                aria-label="Toggle Push Notifications"
              >
                {pushEnabled ? (
                  <span className="text-black">&#x2611;</span>
                ) : (
                  <span className="text-black">&#x2610;</span>
                )}
              </button>
            </div>
            {/* Logout */}
            <button
              className="flex items-center text-red-600 font-semibold px-6 py-4 w-full hover:bg-red-50 transition"
              onClick={handleLogout}
            >
              <FiLogOut className="mr-2 text-lg" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAccount;