import React from 'react';
import { Link } from 'react-router-dom';

function Mainpage() {

  return (
        <div className="min-h-screen bg-gray-100">
          {/* Navbar */}
          <nav className="bg-white shadow-md">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
              <h1 className="text-4xl font-bold text-gray-800">InstaGuapo</h1>
              <div className="flex items-center space-x-4">
                {/* Navbar Links */}
                <ul className="flex space-x-6">
                  <li><Link to="/mainpage" className="text-gray-600 hover:text-gray-800">Home</Link></li>
                  <li><Link to="/collection" className="text-gray-600 hover:text-gray-800">Collection</Link></li>
                  <li><a href="/reservation" className="text-gray-600 hover:text-gray-800">Reservation</a></li>
                  <li><a href="/aboutus" className="text-gray-600 hover:text-gray-800">About Us</a></li>
                </ul>
                {/* Search Bar */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                    🔍
                  </button>
                </div>
              </div>
            </div>
          </nav>
  
        {/* Hero Section */}
        <section className="relative bg-cover bg-center h-[500px]" style={{ backgroundImage: "url('https://via.placeholder.com/1200x500')" }}>
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white px-6">
            <h1 className="text-2xl md:text-4xl font-bold">Rent Perfect Formal Wear for Your Special Occasions</h1>
            <p className="mt-4 text-sm md:text-lg">Browse our collection of designer suits, dresses, and accessories. Reserve now for your upcoming events.</p>
            <Link to="/Collection">
              <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Browse Collection</button>
            </Link>
          </div>
        </section>

        {/* Featured Items Section */}
          <section className="container mx-auto px-6 py-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">Featured Items</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {Array(4).fill().map((_, index) => (
                <div key={index} className="bg-white shadow-md rounded-lg p-4">
                  <div className="h-40 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Product Image</span>
                  </div>
                <h3 className="mt-4 text-lg font-bold text-gray-800">Classic Black Tuxedo</h3>
                  <p className="text-gray-600">PHP1200/day</p>
                  <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full">Reserve Now</button>
                </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {["Browse & Select", "Book Online", "Try It On", "Return"].map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">{index + 1}</div>
                <p className="mt-4 text-gray-600">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-6 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* About Us */}
            <div>
              <h3 className="text-lg font-bold">About Us</h3>
              <p className="text-sm mt-2">Your trusted formal wear rental service since 2019.</p>
            </div>
            {/* Contact */}
            <div>
              <h3 className="text-lg font-bold">Contact</h3>
              <p className="text-sm mt-2">0926-820-8475 / 0915-386-8022</p>
              <p className="text-sm">instaguapo@email.com</p>
              <p className="text-sm">560 JM Loyola Street, Carmona, Philippines, 4116</p>
            </div>
            {/* Follow Us */}
            <div>
              <h3 className="text-lg font-bold">Follow Us</h3>
              <div className="flex justify-center space-x-4 mt-2">
                <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
              </div>
            </div>
          </div>
          <p className="text-sm mt-6">&copy; 2025 InstaGuapo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Mainpage;
