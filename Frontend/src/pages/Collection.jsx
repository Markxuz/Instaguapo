import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FiChevronLeft, FiSettings, FiHeart } from 'react-icons/fi';
import Navbar from '../components/Navbar';

function Collection() {
  const categories = [
    { title: 'Suits', items: Array(4).fill('Classic Black Tuxedo') },
    { title: 'Gowns', items: Array(4).fill('Elegant Evening Gown') },
    { title: 'Barong', items: Array(4).fill('Traditional Barong Tagalog') },
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleReserveClick = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
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
                  <button
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    onClick={() => handleReserveClick(item)}
                  >
                    Reserve Now
                  </button>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Reserve Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg w-[340px] max-w-full p-6 relative">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-2xl text-gray-700 hover:text-black"
              onClick={closeModal}
              aria-label="Close"
            >
              &times;
            </button>
            {/* Modal Content */}
            <div className="flex flex-col items-center">
              <div className="border rounded-lg p-2 mb-2 relative w-48 h-48 flex items-center justify-center">
                {/* Replace with actual image if available */}
                <img
                  src=""
                  alt="Product"
                  className="w-full h-full object-contain"
                />
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs">1/3</span>
                <button className="absolute bottom-2 right-2 text-xs">⤢</button>
              </div>
              <div className="mb-1 font-bold">₱5000</div>
              <div className="mb-1">{selectedItem}</div>
              <div className="mb-1 text-sm">Size</div>
              <button className="border px-2 py-1 rounded text-xs mb-2">True to Size</button>
              <div className="flex items-center mb-2">
                <span className="flex items-center text-xs mr-2">
                  <FiSettings className="mr-1" /> Customization
                </span>
                <FiHeart className="text-blue-600 text-xl cursor-pointer" />
              </div>
              <Link to="/Rprocess">
                <button
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
                  RESERVE NOW
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Collection;