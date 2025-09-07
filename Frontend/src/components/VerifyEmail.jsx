import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyEmail } from "../api/UserApi";
import VerifyEmailForm from "../components/forms/VerifyEmailform";

const VerifyEmail = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await verifyEmail({ email, code });
      setMessage(response.message || "Verification successful!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage(error.message || "Verification failed. Try again.");
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
      <div className="flex items-center justify-center h-screen">
        <VerifyEmailForm
          email={email}
          setEmail={setEmail}
          code={code}
          setCode={setCode}
          handleVerify={handleVerify}
          message={message}
        />
      </div>
    </div>
  );
};

export default VerifyEmail;
