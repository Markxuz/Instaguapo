import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState(""); // State for email in the modal
  const [forgotError, setForgotError] = useState(""); // State for error in the modal
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      const user = response.data.user;

      if (!user) {
        setErrorMessage("Invalid login response. Please try again.");
        setLoading(false);
        return;
      }

      if (!user.IsVerified) {
        setErrorMessage("Please verify your email before logging in.");
        setLoading(false);
        return;
      }

      // Store token & redirect
      localStorage.setItem("token", response.data.token);
      navigate("/Mainpage");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Login failed. Please try again.");
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    if (!forgotEmail) {
      setForgotError("Email is required.");
      return;
    }

    // Simulate an error when sending the code
    setForgotError("Invalid Email.");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">InstaGuapo</h1>
          <ul className="flex space-x-6">
            <li><Link to="/" className="text-gray-600 hover:text-gray-800">Home</Link></li>
            <li><Link to="/signup" className="text-gray-600 hover:text-gray-800">Sign Up</Link></li>
          </ul>
        </div>
      </nav>

      {/* Login Form */}
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white shadow-md rounded-lg p-8 w-96 border border-gray-300">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="Email" className="block text-gray-700">Email</label>
              <input
                type="text"
                id="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <IoEye size={20} /> : <IoEyeOff size={20} />}
                </button>
              </div>
            </div>

            {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}

            <div className="text-right mb-4">
              <button type="button" onClick={() => setIsModalOpen(true)} className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className={`w-full py-2 rounded-lg text-white transition-all ${
                loading ? "bg-gray-500 cursor-not-allowed" : "bg-black hover:bg-gray-800"
              }`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-xl font-bold mb-4">Forgot Password</h3>
            <p className="text-gray-600 mb-4">Enter your email to reset your password.</p>
            <input
              type="email"
              placeholder="Enter your email"
              value={forgotEmail}
              onChange={(e) => {
                setForgotEmail(e.target.value);
                setForgotError(""); // Clear error when user types
              }}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-blue-500"
              required
            />
            {forgotError && <p className="text-red-500 text-sm mb-4">{forgotError}</p>}
            <div className="flex justify-end space-x-4">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">Cancel</button>
              <button onClick={handleForgotPassword} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Send Code</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;