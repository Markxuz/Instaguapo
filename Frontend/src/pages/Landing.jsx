import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LandingNav from "../components/LandingNav";
import { getHeroImage } from "../api/adminSettingsApi";

function LandingPage() {
  const [background, setBackground] = useState("");
  const [formalWears, setFormalWears] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    async function fetchHero() {
      try {
        const response = await getHeroImage();
        if (response.heroImage) {
          setBackground(
            `http://localhost:5000/uploads/settings/${response.heroImage}`
          );
        }
      } catch (error) {
        console.error("Hero image fetch error:", error);
      }
    }
    fetchHero();
    fetchFormalWears();
  }, []);

  const fetchFormalWears = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/formalwear");
      const data = await res.json();
      setFormalWears(data.formalWear || []);
    } catch (err) {
      console.error("Error fetching wears", err);
    }
  };

  const filterByCategory = (category) => {
    return formalWears.filter(
      (item) =>
        item.Category &&
        item.Category.toLowerCase() === category.toLowerCase()
    );
  };

  return (
    <div className="min-h-screen bg-[#ffffff]">
      <LandingNav />

      {/* HERO */}
      <div
        className="h-[70vh] w-full bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(
              rgba(0, 0, 0, 0.4),
              rgba(0, 0, 0, 0.4)
            ), url(${background})`,
        }}
      >
        <div className="flex items-center justify-center h-full">
          <h1 className="text-white text-5xl font-light tracking-wide">
            Elegant Formal Wear for Every Occasion
          </h1>
        </div>
      </div>

      {/* COLLECTIONS */}
      <div className="max-w-6xl mx-auto mt-12 px-4">
        <h2 className="text-3xl font-semibold mb-6 text-[#1A1A1A]">Collections</h2>

        {["gown", "suit", "barong"].map((category) => {
          const items = filterByCategory(category);
          if (items.length === 0) return null;

          // Show only first 4 items
          const displayItems = items.slice(0, 4);

          return (
            <div key={category} className="mb-16">
              {/* BANNER + VIEW ALL */}
              <div className="flex justify-between items-center mb-4 px-2">
                <h3 className="text-2xl font-semibold capitalize text-[#333]">
                  {category}s
                </h3>
                {items.length > 4 && (
                  <Link
                    to={`/collections?type=${category}`}
                    className="text-sm text-[#1A1A1A] border border-[#1A1A1A] px-3 py-1 rounded-lg hover:bg-[#1A1A1A] hover:text-white transition"
                  >
                    View All →
                  </Link>
                )}
              </div>

              {/* GRID */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {displayItems.map((item) => (
                  <div
                    key={item.WearID}
                    className="cursor-pointer bg-white border border-gray-200 shadow-xl rounded-2xl overflow-hidden 
                              hover:scale-105 hover:shadow-2xl hover:border-gray-700 transition-all duration-200
                              flex flex-col h-[380px]"
                    onClick={() => setSelectedItem(item)}
                  >
                    {/* IMAGE HOLDER */}
                    <div className="w-full h-72 bg-gray-100 flex items-center justify-center p-2">
                      <img
                        src={`http://localhost:5000${item.ImageURL}`}
                        alt={item.Name}
                        className="max-h-full w-full object-contain"
                      />
                    </div>

                    {/* DETAILS */}
                    <div className="p-4 flex flex-col justify-between flex-grow">
                      <p className="font-semibold text-lg text-[#1A1A1A] truncate">
                        {item.Name}
                      </p>
                      <p className="text-xl font-bold text-[#1A1A1A] mt-1">
                        ₱{item.Price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* ITEM MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-3xl rounded-xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold">{selectedItem.Name}</h3>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-gray-600 hover:text-black text-xl"
              >
                ✕
              </button>
            </div>

            <img
              src={`http://localhost:5000${selectedItem.ImageURL}`}
              className="w-full h-[400px] object-contain rounded-lg mb-4"
              alt={selectedItem.Name}
            />

            <p className="text-xl font-semibold">₱{selectedItem.Price}</p>
            <p className="text-gray-700 mt-3">{selectedItem.Description}</p>
            <p className="text-gray-600 mt-2 text-sm">
              Category: {selectedItem.Category}
            </p>

            <div className="mt-6 flex gap-3">
              <Link
                to="/login"
                className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg hover:bg-black"
              >
                Login to Reserve
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
                <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold">{index + 1}</div>
                <p className="mt-4 text-gray-600">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-6 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div>
              <h3 className="text-lg font-bold">About Us</h3>
              <p className="text-sm mt-2">Your trusted formal wear rental service since 2019.</p>
            </div>

            <div>
              <h3 className="text-lg font-bold">Contact</h3>
              <p className="text-sm mt-2">0926-820-8475 / 0915-386-8022</p>
              <p className="text-sm">instaguapo@email.com</p>
              <p className="text-sm">560 JM Loyola Street, Carmona, Philippines, 4116</p>
            </div>

            <div>
              <h3 className="text-lg font-bold">Follow Us</h3>
              <div className="flex justify-center space-x-4 mt-2">
                <a href="https://www.facebook.com/share/1DPxfvuJHC/?mibextid=wwXIfr" className="text-white hover:text-gray-400">Facebook</a>
                <a href="#" className="text-white hover:text-gray-400">Instagram</a>
                <a href="#" className="text-white hover:text-gray-400">Twitter</a>
              </div>
            </div>

          </div>
          <p className="text-sm mt-6">&copy; 2025 InstaGuapo. All rights reserved.</p>
          <p className="text-xs mt-2 text-gray-400">
            Admin? <Link to="/admin-login" className="text-blue-400 underline">Log in</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
