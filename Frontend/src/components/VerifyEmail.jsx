import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
    const [email, setEmail] = useState(""); 
    const [code, setCode] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleVerify = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/users/verify", { email, code });
            setMessage(response.data.message || "Verification successful!");
            setTimeout(() => navigate("/login"), 2000); // Redirect to login after success
        } catch (error) {
            setMessage(error.response?.data?.message || "Verification failed. Try again.");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="p-6 bg-white shadow-md rounded-md w-96">
                <h2 className="text-xl font-bold mb-4">Verify Your Email</h2>
                <p className="text-sm text-gray-600 mb-4">Enter the 6-digit code sent to your email.</p>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                />
                <input
                    type="text"
                    placeholder="Enter verification code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                />
                <button
                    onClick={handleVerify}
                    className="w-full bg-blue-500 text-white p-2 rounded"
                >
                    Verify
                </button>
                {message && <p className="text-green-500 mt-2">{message}</p>}
            </div>
        </div>
    );
};

export default VerifyEmail;
