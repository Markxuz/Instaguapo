import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5"; // Import icons for mobile menu

function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">InstaGuapo</h1>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6">
            <li><Link to="/Login" className="text-gray-600 hover:text-gray-800 px-3 py-2">Login</Link></li>
          </ul>

          {/* Mobile Menu Toggle */}
          <button onClick={toggleMenu} className="md:hidden text-gray-700 focus:outline-none">
            {isMenuOpen ? <IoClose size={30} /> : <IoMenu size={30} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-md py-4">
            <ul className="text-center">
              <li><Link to="/" className="block py-2 text-gray-600 hover:text-gray-800" onClick={toggleMenu}>Home</Link></li>
              <li><Link to="/Login" className="block py-2 text-gray-600 hover:text-gray-800" onClick={toggleMenu}>Login</Link></li>
            </ul>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-[400px] sm:h-[500px]" style={{ backgroundImage: "url('https://via.placeholder.com/1200x500')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white px-6">
          <h1 className="text-3xl sm:text-4xl font-bold">Rent Perfect Formal Wear for Your Special Occasions</h1>
          <Link to="/Signup">
            <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Sign Up Now</button>
          </Link>
        </div>
      </section>

      {/* Featured Items */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Items</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array(4).fill().map((_, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4">
              <div className="h-40 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Product Image</span>
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-800">Classic Black Tuxedo</h3>
              <p className="text-gray-600">PHP1200/day</p>
              <button onClick={openModal} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Reserve Now</button>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 sm:w-96">
            <h3 className="text-xl font-bold mb-4">Reserve Now</h3>
            <p className="text-gray-600 mb-4">You need to log in to reserve this item. Please log in or sign up to continue.</p>
            <div className="flex justify-end space-x-4">
              <button onClick={closeModal} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">Cancel</button>
              <Link to="/Login">
                <button onClick={closeModal} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Go to Login</button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* How It Works */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {["Browse & Select", "Book Online", "Try It On", "Return"].map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  {index + 1}
                </div>
                <p className="mt-4 text-gray-600">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm">Your trusted formal wear rental service since 2019.</p>
          <div className="mt-4 flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-6">
            <p>Contact: 0920-420-6969 | instaguapo@email.com</p>
            <p>Location: 250 J.P. Rizal Street, Carmona, Philippines, 4116</p>
          </div>
          <p className="mt-4 text-sm">&copy; 2025 InstaGuapo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
