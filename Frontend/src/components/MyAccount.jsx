import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import ProfileP from "./user/ProfileP";
import { FiSettings } from "react-icons/fi";

import DeleteAccountModal from "./myaccmodal/deleteacc";
import ChangePasswordModal from "./myaccmodal/changepass";
import PasswordFormModal from "./myaccmodal/passform";
import SettingsModal from "./myaccmodal/settings";
import AccountDetails from "./myaccount/Accdetails";

import { deleteAccount } from "./../api/UserApi";

const MyAccount = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pushEnabled, setPushEnabled] = useState(true);

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setName(storedUser.FullName || "");
      setPhoneNumber(storedUser.PhoneNumber || "");
      setEmail(storedUser.Email || "");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleContinueToPasswordChange = () => {
    setShowChangePassword(false);
    setShowPasswordForm(true);
  };

  const handlePasswordChange = () => {
    console.log("New Password:", newPassword);
    setShowPasswordForm(false);
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error("Delete failed:", error.message);
      alert(error.message);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center pt-20"
      style={{
        backgroundImage: "url('images/background_resized.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
      }}
    >
      <Navbar />
      <section>
        <div className="container mx-auto px-6 py-8">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto relative">
            <button
              className="absolute top-6 right-6 text-2xl text-gray-700 hover:text-black"
              onClick={() => setShowSettings(true)}
              aria-label="Settings"
            >
              <FiSettings />
            </button>

            <ProfileP />
            <AccountDetails
              name={name}
              setName={setName}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              email={email}
              setEmail={setEmail}
              onChangePassword={() => setShowChangePassword(true)}
            />

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

      {showDeleteAccount && (
        <DeleteAccountModal
          onClose={() => setShowDeleteAccount(false)}
          onDelete={handleDeleteAccount}
        />
      )}

      {showChangePassword && (
        <ChangePasswordModal
          onClose={() => setShowChangePassword(false)}
          onContinue={handleContinueToPasswordChange}
        />
      )}

      {showPasswordForm && (
        <PasswordFormModal
          newPassword={newPassword}
          confirmPassword={confirmPassword}
          setNewPassword={setNewPassword}
          setConfirmPassword={setConfirmPassword}
          onBack={() => {
            setShowPasswordForm(false);
            setShowChangePassword(true);
          }}
          onSubmit={handlePasswordChange}
        />
      )}

      {showSettings && (
        <SettingsModal
          onClose={() => setShowSettings(false)}
          pushEnabled={pushEnabled}
          togglePush={() => setPushEnabled(!pushEnabled)}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
};

export default MyAccount;
