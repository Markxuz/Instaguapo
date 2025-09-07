import React from "react";

function VerifyEmailForm({
  email, setEmail,
  code, setCode,
  handleVerify,
  message
}) {
  return (
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
  );
}

export default VerifyEmailForm;
