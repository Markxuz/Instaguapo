import { FiUser, FiPhone, FiMail, FiArrowRight } from "react-icons/fi";

const AccountDetails = ({ name, setName, phoneNumber, setPhoneNumber, email, setEmail, onChangePassword }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <label className="block text-gray-700 font-medium mb-1">Name:</label>
        <div className="flex items-center border-b border-gray-300 mb-4">
          <FiUser className="text-gray-400 mr-2" />
          <input
            type="text"
            className="w-full bg-transparent outline-none py-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <label className="block text-gray-700 font-medium mb-1">Phone Number:</label>
        <div className="flex items-center border-b border-gray-300 mb-6">
          <FiPhone className="text-gray-400 mr-2" />
          <input
            type="text"
            className="w-full bg-transparent outline-none py-1"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <button
          className="flex items-center border border-gray-400 rounded-full px-4 py-2 font-medium hover:bg-gray-100 transition"
          onClick={onChangePassword}
        >
          Change Password <FiArrowRight className="ml-2" />
        </button>
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Email Address</label>
        <div className="flex items-center border-b border-gray-300 mb-6">
          <FiMail className="text-gray-400 mr-2" />
          <input
            type="email"
            className="w-full bg-transparent outline-none py-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="w-32 bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition">
          Update
        </button>
      </div>
    </div>
  );
};

export default AccountDetails;
