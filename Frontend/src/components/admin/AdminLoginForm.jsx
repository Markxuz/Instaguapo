import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../api/AdminApi";

function AdminLoginForm() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await loginAdmin({ Email, Password });
      localStorage.setItem("adminToken", res.token);
      navigate("/admin-dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8 w-96 border border-gray-300">
      <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>

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
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default AdminLoginForm;
