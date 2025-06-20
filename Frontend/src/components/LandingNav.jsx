import { Link } from "react-router-dom";

const LandingNav = () => {
  return (
    <nav className="bg-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">InstaGuapo</h1>
        <div className="space-x-6">
          <Link to="/login" className="text-gray-600 hover:text-blue-500">Login</Link>
          <Link to="/signup" className="text-gray-600 hover:text-blue-500">Signup</Link>
        </div>
      </div>
    </nav>
  );
};

export default LandingNav;
