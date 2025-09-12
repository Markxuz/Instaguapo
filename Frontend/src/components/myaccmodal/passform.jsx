import { FiChevronLeft } from "react-icons/fi";

function PasswordFormModal({
  newPassword,
  confirmPassword,
  setNewPassword,
  setConfirmPassword,
  onBack,
  onSubmit,
}) {
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
        <div className="flex items-center mb-6">
          <button onClick={onBack} className="text-gray-500 hover:text-gray-700 mr-2">
            <FiChevronLeft className="text-xl" />
          </button>
          <h2 className="text-xl font-bold flex-1 text-center">Change Password</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">New Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Confirm New Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
            />
          </div>
        </div>

        <button
          className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700"
          onClick={onSubmit}
          disabled={!newPassword || !confirmPassword || newPassword !== confirmPassword}
        >
          Change Password
        </button>
      </div>
    </div>
  );
}

export default PasswordFormModal;
