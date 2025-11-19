import { FiBell } from "react-icons/fi";

function SettingsModal({ onClose, pushEnabled, togglePush, onLogout }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">

      {/* Modal Box */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        {/* Title */}
        <h3 className="text-lg font-semibold mb-5">Settings</h3>

        {/* Push Notifications */}
        <div className="flex items-center justify-between bg-gray-100 px-4 py-3 rounded-md mb-4">
          <div className="flex items-center gap-2">
            <FiBell className="text-lg" />
            <span className="font-medium">Push Notifications</span>
          </div>

          <button
            onClick={togglePush}
            className={`px-3 py-1 rounded-full text-sm ${
              pushEnabled ? "bg-green-600 text-white" : "bg-gray-300 text-gray-700"
            }`}
          >
            {pushEnabled ? "ON" : "OFF"}
          </button>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 w-full mt-2"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default SettingsModal;
