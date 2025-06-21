import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { FiSettings, FiUser, FiEdit2, FiMail, FiPhone, FiArrowRight, FiBell, FiLogOut, FiChevronLeft, FiX } from 'react-icons/fi';

const MyAccount = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false); // New state for delete account modal
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pushEnabled, setPushEnabled] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleContinueToPasswordChange = () => {
    setShowChangePassword(false);
    setShowPasswordForm(true);
  };

  const handlePasswordChange = () => {
    // Add your password change logic here
    console.log('New Password:', newPassword);
    setShowPasswordForm(false);
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleDeleteAccount = () => {
    // Add your account deletion logic here
    console.log('Account deletion requested');
    // After deletion, you might want to log the user out and redirect
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
                  />
                </div>
                <label className="block text-gray-700 font-medium mb-1">Phone Number:</label>
                <div className="flex items-center border-b border-gray-300 mb-6">
                  <FiPhone className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    className="w-full bg-transparent outline-none py-1"
                    placeholder="Phone Number"

                  />
                </div>
                <button 
                  className="flex items-center border border-gray-400 rounded-full px-4 py-2 font-medium hover:bg-gray-100 transition"
                  onClick={() => setShowChangePassword(true)}
                >
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


                  />
                </div>
                <button className="w-32 bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition">
                  Update
                </button>
              </div>
            </div>
            {/* Delete Account */}
            <div className="flex justify-center mt-8">
              <button 
                className="text-red-600 hover:text-red-800 font-medium text-lg"
                onClick={() => setShowDeleteAccount(true)}
              >
                Delete my account
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Delete Account Confirmation Modal */}
      {showDeleteAccount && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-30"
          style={{
                backgroundImage: "url('images/background_resized.jpg')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center bottom"}}>
          <div className="bg-white rounded-xl shadow-lg w-[370px] max-w-full p-6">
            <div className="flex justify-end mb-4">
              <button 
                onClick={() => setShowDeleteAccount(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="text-xl" />
              </button>
            </div>
            <h2 className="text-xl font-bold text-center mb-2">
              Delete your InstaGuapo account?
            </h2>
            <p className="text-gray-600 text-center mb-6">
              If you delete your account, you will lose all your account information on InstaGuapo. You will also be logged out and unable to login again.
            </p>
            <div className="flex justify-center space-x-4 mt-8">
              <button
                className="px-6 py-2 border border-gray-400 rounded-lg font-medium hover:bg-gray-100"
                onClick={() => setShowDeleteAccount(false)}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Confirmation Modal */}
      {showChangePassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-30"
          style={{
                backgroundImage: "url('images/background_resized.jpg')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center bottom"}}>
          <div className="bg-white rounded-xl shadow-lg w-[370px] max-w-full p-6">
            <div className="flex justify-end mb-4">
              <button 
                onClick={() => setShowChangePassword(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="text-xl" />
              </button>
            </div>
            <h2 className="text-xl font-bold text-center mb-6">
              Are you sure you want to<br />
              change your password?
            </h2>
            <div className="flex justify-center space-x-4 mt-8">
              <button
                className="px-6 py-2 border border-gray-400 rounded-lg font-medium hover:bg-gray-100"
                onClick={() => setShowChangePassword(false)}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                onClick={handleContinueToPasswordChange}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Password Change Form Modal */}
      {showPasswordForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-30"
        style={{
                backgroundImage: "url('images/background_resized.jpg')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center bottom"}}>
          <div className="bg-white rounded-xl shadow-lg w-[370px] max-w-full p-6">
            <div className="flex items-center mb-6">
              <button 
                onClick={() => {
                  setShowPasswordForm(false);
                  setShowChangePassword(true);
                }}
                className="text-gray-500 hover:text-gray-700 mr-2"
              >
                <FiChevronLeft className="text-xl" />
              </button>
              <h2 className="text-xl font-bold flex-1 text-center">Change Password</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">New Password</label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-1">Confirm New Password</label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
              </div>
            </div>
            
            <button
              className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700"
              onClick={handlePasswordChange}
              disabled={!newPassword || !confirmPassword || newPassword !== confirmPassword}
            >
              Change Password
            </button>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-30"
        style={{
                backgroundImage: "url('images/background_resized.jpg')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center bottom"}}>
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