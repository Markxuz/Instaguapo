import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyAdmin } from "../../api/AdminApi";

function AdVerificationForm() {
  const [Email, setEmail] = useState("");
  const [VerificationCode, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const data = await verifyAdmin({ Email, VerificationCode });
      setSuccess(data.message);
      setTimeout(() => navigate("/admin-login"), 2000);
    } catch (err) {
      setError(err.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-gray-100"
      style={{
        backgroundImage: "url('images/background_resized.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center bottom"
      }}
    >
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white shadow-md rounded-lg p-8 w-96 border border-gray-300">
                <h2 className="text-2xl font-bold text-center mb-6">Admin Verification</h2>

                {error && <p className="text-red-500 mb-2 text-center">{error}</p>}
                {success && <p className="text-green-500 mb-2 text-center">{success}</p>}

                <form onSubmit={handleVerify}>
                <input
                    type="email"
                    placeholder="Email"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-4 px-4 py-2 border border-gray-300 rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="Verification Code"
                    value={VerificationCode}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full mb-4 px-4 py-2 border border-gray-300 rounded"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
                    disabled={loading}
                >
                    {loading ? "Verifying..." : "Verify"}
                </button>
                </form>
            </div>
        </div>
    </div>    
  );
}

export default AdVerificationForm;
