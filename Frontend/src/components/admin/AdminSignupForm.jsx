import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupAdmin } from "../../api/AdminApi";

function AdminSignupForm() {
  const [Fullname, setFullname] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [RoleID, setRoleID] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await signupAdmin({
        Fullname: Fullname,       
        Email: Email,
        PhoneNumber: PhoneNumber,
        Password: Password, 
        RoleID: RoleID || null,
      });

      setSuccess(data.message);

      setTimeout(() => navigate("/admin-verification"), 2000);
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8 w-96 border border-gray-300">
      <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

      {error && <p className="text-red-500 mb-2 text-center">{error}</p>}
      {success && <p className="text-green-500 mb-2 text-center">{success}</p>}

      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Full name"
          value={Fullname}
          onChange={(e) => setFullname(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded"
          required
        />
        <input
          type="tel"
          placeholder="Phone number"
          value={PhoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded"
          required
        />
        <input
          type="number"
          placeholder="Role ID (optional)"
          value={RoleID}
          onChange={(e) => setRoleID(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default AdminSignupForm;
