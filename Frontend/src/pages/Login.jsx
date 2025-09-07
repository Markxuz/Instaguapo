import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LandingNav from "../components/LandingNav";
import LoginForm from "../components/forms/Loginform";
import ForgotPasswordModal from "../components/modal/Forgotpassmodal";
import { loginUser, forgotPassword } from "../api/UserApi";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotError, setForgotError] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const response = await loginUser({ email, password });
      const user = response.user;

      if (!user) throw new Error("Invalid login response. Please try again.");
      if (!user.IsVerified) throw new Error("Please verify your email before logging in.");

      localStorage.setItem("token", response.token);
      navigate("/Mainpage");
    } catch (error) {
      setErrorMessage(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!forgotEmail) {
      setForgotError("Email is required.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(forgotEmail)) {
      setForgotError("Please enter a valid email address");
      return;
    }

    try {
      setForgotLoading(true);
      setForgotError("");
      await forgotPassword(forgotEmail);

      setForgotSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setForgotSuccess(false);
      }, 2000);
    } catch (error) {
      setForgotError(error.message || "Error sending reset link");
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-100 flex flex-col"
      style={{
        backgroundImage: "url('images/background_resized.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center bottom"
      }}
    >
      <LandingNav />
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white shadow-md rounded-lg p-8 w-96 border border-gray-300">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <LoginForm
            email={email} setEmail={setEmail}
            password={password} setPassword={setPassword}
            showPassword={showPassword} setShowPassword={setShowPassword}
            handleLogin={handleLogin}
            loading={loading}
            errorMessage={errorMessage}
            openForgotModal={() => setIsModalOpen(true)}
          />
        </div>
      </div>

      <ForgotPasswordModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        forgotEmail={forgotEmail}
        setForgotEmail={setForgotEmail}
        forgotError={forgotError}
        forgotLoading={forgotLoading}
        forgotSuccess={forgotSuccess}
        handleForgotPassword={handleForgotPassword}
      />
    </div>
  );
}

export default Login;