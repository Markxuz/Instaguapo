import React from 'react';
import { Link } from 'react-router-dom';

function Collection() {
  const categories = [
    { title: 'Suits', items: Array(4).fill('Classic Black Tuxedo') },
    { title: 'Gowns', items: Array(4).fill('Elegant Evening Gown') },
    { title: 'Barong', items: Array(4).fill('Traditional Barong Tagalog') },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-4xl font-bold text-gray-800">InstaGuapo</h1>
          <div className="flex items-center space-x-4">
            {/* Navbar Links */}
            <ul className="flex space-x-6">
              <li><Link to="/Mainpage" className="text-gray-600 hover:text-gray-800">Home</Link></li>
              <li><Link to="/collection" className="text-gray-600 hover:text-gray-800">Collection</Link></li>
              <li><Link to="/reservation" className="text-gray-600 hover:text-gray-800">Reservation</Link></li>
              <li><Link to="/aboutus" className="text-gray-600 hover:text-gray-800">About Us</Link></li>
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

      {/* Collection Sections */}
      <div className="container mx-auto px-6 py-12">
        {categories.map((category, index) => (
          <section key={index} className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{category.title}</h2>
              <a href="#" className="text-blue-600 hover:underline">View All</a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {category.items.map((item, idx) => (
                <div key={idx} className="bg-white shadow-md rounded-lg p-4">
                  <div className="h-40 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Product Image</span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-gray-800">{item}</h3>
                  <p className="text-gray-600">₱1200/day</p>
                  <Link to= "/Reservation">
                  <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Reserve Now
                  </button>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default Collection;