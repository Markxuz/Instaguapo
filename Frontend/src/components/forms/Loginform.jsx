import { IoEye, IoEyeOff } from "react-icons/io5";

function LoginForm({
  email, setEmail,
  password, setPassword,
  showPassword, setShowPassword,
  handleLogin,
  loading,
  errorMessage,
  openForgotModal
}) {
  return (
    <form onSubmit={handleLogin}>
      <div className="mb-4">
        <label htmlFor="Email" className="block text-gray-700">Email</label>
        <input
          type="text"
          id="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            required
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

      {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}

      <div className="text-right mb-4">
        <button
          type="button"
          onClick={openForgotModal}
          className="text-sm text-blue-600 hover:underline"
        >
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        className={`w-full py-2 rounded-lg text-white transition-all ${
          loading ? "bg-gray-500 cursor-not-allowed" : "bg-black hover:bg-gray-800"
        }`}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

export default LoginForm;
