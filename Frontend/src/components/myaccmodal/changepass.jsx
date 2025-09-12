import { FiX } from "react-icons/fi";

function ChangePasswordModal({ onClose, onContinue }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-30"
      style={{
        backgroundImage: "url('images/background_resized.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
      }}
    >
      <div className="bg-white rounded-xl shadow-lg w-[370px] max-w-full p-6">
        <div className="flex justify-end mb-4">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FiX className="text-xl" />
          </button>
        </div>
        <h2 className="text-xl font-bold text-center mb-6">
          Are you sure you want to<br />
          change your password?
        </h2>
        <div className="flex justify-center space-x-4 mt-8">
          <button
            className="px-6 py-2 border border-gray-400 rounded-lg font-medium hover:bg-gray-100"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
            onClick={onContinue}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordModal;
