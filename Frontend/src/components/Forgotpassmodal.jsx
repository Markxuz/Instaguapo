import { Link } from "react-router-dom";

function ForgotpassModal({
  isModalOpen, setIsModalOpen,
  forgotEmail, setForgotEmail,
  forgotError, forgotLoading,
  forgotSuccess,
  handleForgotPassword
}) {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center"
      style={{
        backgroundImage: "url('images/background_resized.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center bottom"
      }}>
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h3 className="text-xl font-bold mb-4">Forgot Password</h3>

        {forgotSuccess ? (
          <div className="text-center">
            <p className="text-green-500 mb-4">Code sent! Check your email.</p>
            <Link
              to="/reset-password"
              onClick={() => setIsModalOpen(false)}
              className="text-blue-600 hover:underline"
            >
              Go to Reset Password →
            </Link>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-4">Enter your email to receive a reset code.</p>
            <input
              type="email"
              placeholder="Enter your email"
              value={forgotEmail}
              onChange={(e) => {
                setForgotEmail(e.target.value);
              }}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-blue-500"
              required
            />
            {forgotError && <p className="text-red-500 text-sm mb-4">{forgotError}</p>}

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                disabled={forgotLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleForgotPassword}
                className={`px-4 py-2 text-white rounded-lg ${
                  forgotLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={forgotLoading}
              >
                {forgotLoading ? "Sending..." : "Send Code"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ForgotpassModal;
