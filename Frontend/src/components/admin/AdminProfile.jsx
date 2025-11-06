import React, { useState, useEffect } from "react";
import { FaUpload, FaCog } from "react-icons/fa";
import AdminNavbar from "./AdminNavbar";
import {
  getAdminProfile,
  updateAdminProfile,
  deleteAdminAccount,
} from "../../api/AdminApi";

function AdminProfile() {
  const [profile, setProfile] = useState({
    Fullname: "",
    Email: "",
    PhoneNumber: "",
    ProfilePhoto: "",
    ProfilePhotoFile: null,
  });

  const [heroImage, setHeroImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModal, setIsPasswordModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getAdminProfile();
        const data = response.admin;
        setProfile({
          Fullname: data.Fullname || "",
          Email: data.Email || "",
          PhoneNumber: data.PhoneNumber || "",
          ProfilePhoto: data.ProfilePhoto
            ? `http://localhost:5000/${data.ProfilePhoto}`
            : "/default-avatar.png",
          ProfilePhotoFile: null,
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // ✅ Upload profile photo
  const handleProfilePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      const photoURL = URL.createObjectURL(file);
      setProfile({ ...profile, ProfilePhoto: photoURL, ProfilePhotoFile: file });
    }
  };

  // ✅ Upload hero image (featured)
  const handleHeroImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const photoURL = URL.createObjectURL(file);
      setHeroImage(photoURL);
      alert("Hero image selected! (You can link this to backend later)");
    }
  };

  // ✅ Update admin profile info
  const handleUpdate = async () => {
    try {
      const result = await updateAdminProfile(profile);
      alert("Profile updated successfully!");
      if (result.admin && result.admin.ProfilePhoto) {
        setProfile({
          ...profile,
          ProfilePhoto: result.admin.ProfilePhoto,
          ProfilePhotoFile: null,
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  // ✅ Change password modal action
  const handleChangePassword = () => {
    setIsPasswordModal(true);
  };

  const submitNewPassword = () => {
    if (!newPassword) return alert("Enter a new password first.");
    alert("Password updated successfully! (connect backend next)");
    setIsPasswordModal(false);
  };

  // ✅ Add another account (redirect)
  const handleAddAccount = () => {
    window.location.href = "/admin-signup";
  };

  // ✅ Delete account
  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;
    try {
      await deleteAdminAccount();
      alert("Account deleted successfully.");
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminData");
      window.location.href = "/";
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Failed to delete account.");
    }
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    window.location.href = "/admin/login";
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading profile...</p>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-opacity-30"
      style={{
        backgroundImage: "url('images/background_resized.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
      }}
    >
      <AdminNavbar />

      <div className="w-full p-6 bg-white shadow-md rounded-2xl max-w-4xl mx-auto my-8 mt-18 space-y-10">
        {/* Header with Settings Button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Account Details</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-gray-200 px-3 py-2 rounded-md hover:bg-gray-300"
          >
            <FaCog /> Settings
          </button>
        </div>

        {/* Account Details */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative">
            <img
              src={profile.ProfilePhoto}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border"
            />
            <label className="absolute bottom-0 right-0 bg-black text-white p-2 rounded-full cursor-pointer">
              <FaUpload size={14} />
              <input type="file" className="hidden" onChange={handleProfilePhoto} />
            </label>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <input
              type="text"
              value={profile.Fullname}
              onChange={(e) => setProfile({ ...profile, Fullname: e.target.value })}
              className="border p-2 rounded-md w-full"
              placeholder="Full Name"
            />
            <input
              type="email"
              value={profile.Email}
              onChange={(e) => setProfile({ ...profile, Email: e.target.value })}
              className="border p-2 rounded-md w-full"
              placeholder="Email Address"
            />
            <input
              type="text"
              value={profile.PhoneNumber}
              onChange={(e) => setProfile({ ...profile, PhoneNumber: e.target.value })}
              className="border p-2 rounded-md w-full"
              placeholder="Contact Number"
            />
            <button
              onClick={handleUpdate}
              className="bg-black text-white px-4 py-2 rounded-md w-fit hover:bg-gray-800"
            >
              Update Profile
            </button>
          </div>
        </div>

        {/* ✅ Hero Image Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Hero Image</h2>
          <div className="border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-6 text-center">
            {heroImage ? (
              <img
                src={heroImage}
                alt="Hero"
                className="rounded-xl max-h-60 object-cover"
              />
            ) : (
              <>
                <FaUpload size={40} className="text-gray-400" />
                <p className="mt-2 text-gray-500">Drag Photo To Upload</p>
              </>
            )}
            <label className="mt-3 bg-black text-white px-4 py-2 rounded-md cursor-pointer">
              Choose Photo
              <input type="file" className="hidden" onChange={handleHeroImageUpload} />
            </label>
          </div>
        </div>

        {/* ✅ Password & Account Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 border-t pt-6">
          <div className="flex gap-3">
            <button
              onClick={handleChangePassword}
              className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
            >
              Change Password
            </button>
            <button
              onClick={handleDeleteAccount}
              className="text-red-600 hover:underline"
            >
              Delete My Account
            </button>
          </div>
          <button
            onClick={handleAddAccount}
            className="text-blue-600 hover:underline mt-4 sm:mt-0"
          >
            Add another account
          </button>
        </div>
      </div>

      {/* ✅ Settings Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <h3 className="text-lg font-semibold mb-4">Settings</h3>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 w-full"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {/* ✅ Change Password Modal */}
      {isPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center relative">
            <button
              onClick={() => setIsPasswordModal(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <h3 className="text-lg font-semibold mb-4">Change Password</h3>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="border p-2 rounded-md w-full mb-4"
            />
            <button
              onClick={submitNewPassword}
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 w-full"
            >
              Update Password
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProfile;
