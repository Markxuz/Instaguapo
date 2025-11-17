import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LandingNav from "../components/LandingNav";
import { getHeroImage } from "../api/adminSettingsApi";

function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [background, setBackground] = useState(""); // stores hero image URL
  const navigate = useNavigate();

  // Fetch hero image from backend on mount
  useEffect(() => {
    async function fetchBackground() {
      try {
        const data = await getHeroImage(); // returns { heroImage: 'filename.jpg' } or null
        if (data && data.heroImage) {
          setBackground(`http://localhost:5000/uploads/settings/${data.heroImage}`);
        } else {
          // fallback default image
          setBackground("/images/defaultHero.jpg");
        }
      } catch (err) {
        console.error("Error fetching hero image:", err);
        setBackground("/images/defaultHero.jpg");
      }
    }
    fetchBackground();
  }, []);

  // Hidden admin access (3 clicks)
  const handleSecretClick = () => {
    setClickCount((prev) => prev + 1);
    if (clickCount + 1 === 3) {
      navigate("/admin-login");
      setClickCount(0);
    }
    setTimeout(() => setClickCount(0), 2000);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <LandingNav />

      {/* HERO IMAGE */}
      <section
        className="relative bg-cover bg-center h-[500px]"
        style={{
          backgroundImage: `url(${background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
          <h1 className="text-3xl sm:text-4xl font-bold">
            Rent Perfect Formal Wear for Your Special Occasions
          </h1>
          <Link to="/Signup">
            <button className="mt-6 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-700 transition">
              Sign Up Now
            </button>
          </Link>
        </div>
      </section>

      {/* Featured Items */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Featured Items
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[ 
            { id: 1, name: "Luxury Blue Ball Gown", price: "₱5000", image: "images/blue.png" },
            { id: 2, name: "Luxury Red Ball Gown", price: "₱5000", image: "images/red.png" },
            { id: 3, name: "Black White Silver Coat", price: "₱2500", image: "images/black.png" },
            { id: 4, name: "Navy Blue Full Set", price: "₱3500", image: "images/dblue.png" }
          ].map((item) => (
            <div key={item.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="h-48 bg-white flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="max-h-full object-contain"
                  onError={(e) => { e.target.onerror = null; e.target.src = "images/placeholder.jpg"; }}
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                <p className="text-gray-600 my-2">{item.price}</p>
                <button
                  onClick={openModal}
                  className="w-full mt-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-700 transition"
                >
                  Reserve Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hidden Admin Access Trigger */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm">Your trusted formal wear rental service since 2019.</p>
          <p className="mt-4 text-sm">
            &copy; 2025{" "}
            <span
              onClick={handleSecretClick}
              className="cursor-pointer select-none"
              title="© InstaGuapo"
            >
              InstaGuapo
            </span>
            . All rights reserved.
          </p>
        </div>
      </footer>

      {/* Modal Example */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 sm:w-96">
            <h3 className="text-xl font-bold mb-4">Reserve Now</h3>
            <p className="text-gray-600 mb-4">
              You need to log in to reserve this item. Please log in or sign up to continue.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <Link to="/Login">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Go to Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
