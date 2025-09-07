import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LandingNav from "../components/LandingNav";
import SignupForm from "../components/forms/Signupform";
import { signupUser } from "../api/UserApi";

function Signup() {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();


    if (!fullname || !email || !password || !confirmPassword || !phonenumber) {
      setError("All fields are required.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!/^\d{11}$/.test(phonenumber)) {
      setError("Phone number must be 11 digits.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await signupUser({ fullname, email, password, phonenumber });
      setSuccessMessage("Signup successful! Please check your email for the verification code.");
      setTimeout(() => navigate("/VerifyEmail"), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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
          <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
          <SignupForm
            fullname={fullname} setFullName={setFullName}
            email={email} setEmail={setEmail}
            phonenumber={phonenumber} setPhonenumber={setPhonenumber}
            password={password} setPassword={setPassword}
            confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
            showPassword={showPassword} setShowPassword={setShowPassword}
            showConfirmPassword={showConfirmPassword} setShowConfirmPassword={setShowConfirmPassword}
            handleSignup={handleSignup}
            loading={loading}
            error={error}
            successMessage={successMessage}
          />
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Signup;