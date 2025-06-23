import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FiSettings, FiHeart } from 'react-icons/fi';
import Navbar from '../components/Navbar';

function Collection() {
  const allItems = [
    { name: 'Two Tone Full Set', image: '/images/maroont.png', price: '₱5000'},
    { name: 'Metalic Pink Tuxedo', image: '/images/metalpink.png', price: '₱4500' },
    { name: 'Gray Tries Full Set', image: '/images/graytries.png', price: '₱3500' },
    { name: 'Silver Gray Tuxedo', image: '/images/silvergray.png', price: '₱4500' },
    { name: 'Luxury Kahel', image: '/images/luxkahel.png', price: '₱5000' },
    { name: 'Luxury Mermaid Pink', image: '/images/luxmermaid.png', price: '₱8500' },
    { name: 'Flower Pink Ballgown', image: '/images/flower.png', price: '₱6500' },
    { name: 'Feather Black Ombre', image: '/images/feather.png', price: '₱3500'},
    { name: 'Basic Barong', image: '/images/basic1.png', price: '₱1500' },
    { name: 'Basic Barong', image: '/images/basic2.png', price: '₱1500' },
    { name: 'Basic Barong', image: '/images/basic3.png', price: '₱1500' },
    { name: 'Polo Coat Barong', image: '/images/polocoat.png', price: '₱3500' },
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  const handleReserveClick = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />


      <div className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Collections</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {allItems.map((item, idx) => (
            <div key={idx} className="bg-white shadow-md rounded-lg p-4">
              <div className="h-40 bg-gray-200 rounded overflow-hidden flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="object-contain max-h-full"
                />
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-800">{item.name}</h3>
              <p className="text-gray-600">{item.price}</p>
              <button
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={() => handleReserveClick(item)}
              >
                Reserve Now
              </button>
            </div>
          ))}
        </div>
      </div>


      {modalOpen && selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40"
          style={{
            backgroundImage: "url('images/background_resized.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center bottom",
          }}
        >
          <div className="bg-white rounded-xl shadow-lg w-[340px] max-w-full p-6 relative">
            <button
              className="absolute top-3 right-3 text-2xl text-gray-700 hover:text-black"
              onClick={closeModal}
              aria-label="Close"
            >
              &times;
            </button>


            <div className="flex flex-col items-center">
              <div className="border rounded-lg p-2 mb-2 relative w-48 h-48 flex items-center justify-center bg-gray-100">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="object-contain max-h-full max-w-full"
                />
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs">1/3</span>
                <button className="absolute bottom-2 right-2 text-xs">⤢</button>
              </div>
              <div className="mb-1 font-bold">₱1200/day</div>
              <div className="mb-1">{selectedItem.name}</div>
              <div className="mb-1 text-sm">Size</div>
              <button className="border px-2 py-1 rounded text-xs mb-2">True to Size</button>
              <div className="flex items-center mb-2">
                <span className="flex items-center text-xs mr-2">
                  <FiSettings className="mr-1" /> Customization
                </span>
                <FiHeart className="text-blue-600 text-xl cursor-pointer" />
              </div>
              <Link to="/Rprocess">
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
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
