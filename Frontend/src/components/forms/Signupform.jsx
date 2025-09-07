import { IoEye, IoEyeOff } from "react-icons/io5";

function SignupForm({
  fullname, setFullName,
  email, setEmail,
  phonenumber, setPhonenumber,
  password, setPassword,
  confirmPassword, setConfirmPassword,
  showPassword, setShowPassword,
  showConfirmPassword, setShowConfirmPassword,
  handleSignup,
  loading,
  error,
  successMessage
}) {
  return (
    <form onSubmit={handleSignup}>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}


      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Full Name</label>
        <input
          type="text"
          value={fullname}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Enter your full name"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600"
        />
      </div>


      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600"
        />
      </div>


      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
        <input
          type="tel"
          value={phonenumber}
          onChange={(e) => setPhonenumber(e.target.value)}
          placeholder="Enter your phone number"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600"
        />
      </div>


      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <IoEye size={20} /> : <IoEyeOff size={20} />}
          </button>
        </div>
      </div>


      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showConfirmPassword ? <IoEye size={20} /> : <IoEyeOff size={20} />}
          </button>
        </div>
      </div>


      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
        disabled={loading}
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  );
}

export default SignupForm;
