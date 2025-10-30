import { FiChevronLeft, FiBell, FiLogOut } from "react-icons/fi";

function SettingsModal({ onClose, pushEnabled, togglePush, onLogout }) {
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
      <div className="bg-white rounded-xl shadow-lg w-[370px] max-w-full">
        <div className="flex items-center justify-center relative border-b px-4 py-4">
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-gray-700 hover:text-black"
            onClick={onClose}
          >
            <FiChevronLeft />
          </button>
          <h2 className="text-xl font-bold text-center flex-1">Settings</h2>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center">
            <FiBell className="mr-2 text-lg" />
            <span className="font-semibold">Push Notifications</span>
          </div>
          <button className="text-3xl" onClick={togglePush}>
            {pushEnabled ? <span>&#x2611;</span> : <span>&#x2610;</span>}
          </button>
        </div>
        <div className="hover:bg-red-300 transition">
          <button
            className="flex items-center text-red-700 font-semibold px-6 py-4"
            onClick={onLogout}
          >
            <FiLogOut className="mr-2 text-lg" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;
