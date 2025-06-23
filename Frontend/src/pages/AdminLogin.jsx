import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdNav from "../components/AdNav";
import axios from "axios";

function AdminLogin() {
  const [password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        Email,
        password,
      });
      localStorage.setItem("adminToken", res.data.token);
      navigate("/admin-dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AdNav />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>

          {error && <p className="text-red-500 mb-2 text-center">{error}</p>}

          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;