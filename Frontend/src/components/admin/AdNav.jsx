import { Link } from "react-router-dom";

const AdNav = () => {
  return (
    <nav className="bg-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">
          <Link to= "/" className="hover:text-blue-500">Instaguapo.</Link>
        </h1>
        <div className="space-x-6">
          <Link to="/admin-signup" className="text-gray-600 hover:text-gray-800">Signup</Link>
          <Link to="/admin-login" className="text-gray-600 hover:text-gray-800">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default AdNav;
