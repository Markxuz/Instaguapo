import React, { useState } from "react";
import { Link } from "react-router-dom";
import LandingNav from "../components/LandingNav";

function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <LandingNav />

      <section
          className="relative bg-cover bg-center h-[500px]"
          style={{
            backgroundImage: "url('images/background_resized.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center bottom"
          }}
        >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
          <h1 className="text-3xl sm:text-4xl font-bold">Rent Perfect Formal Wear for Your Special Occasions</h1>
          <Link to="/Signup">
            <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Sign Up Now</button>
          </Link>
        </div>
      </section>

  
      <section className="container mx-auto px-6 py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              {
                id: 1,
                name: "Luxury Blue Ball Gown",
                price: "₱5000",
                image: "images/blue.png"
              },
              {
                id: 2,
                name: "Luxury Red Ball Gown",
                price: "₱5000",
                image: "images/red.png"
              },
              {
                id: 3,
                name: "Black White Silver Coat",
                price: "₱2500",
                image: "images/black.png"
              },
              {
                id: 4,
                name: "Navy Blue Full Set",
                price: "₱3500",
                image: "images/dblue.png"
              }
            ].map((item) => (
              <div key={item.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="h-48 bg-white flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-h-full object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "images/placeholder.jpg";
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600 my-2">{item.price}</p>
                  <button
                    onClick={openModal}
                    className="w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Reserve Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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

      <section className="bg-white py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {["Browse & Select", "Book Online", "Try It On", "Return"].map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold">
                  {index + 1}
                </div>
                <p className="mt-4 text-gray-600">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


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
