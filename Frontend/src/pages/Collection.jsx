import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CollectionModal from "../components/modal/CollectionModal";
import { getFormalWear } from "../api/FormalWearApi";
import { addFavorite, removeFavorite, getFavorites } from "../api/FavoriteApi";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

function Collection() {
  const [allItems, setAllItems] = useState([]);
  const [favorites, setFavorites] = useState([]); 
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchData() {
      try {
        const wearData = await getFormalWear();
        setAllItems(Array.isArray(wearData.formalWear) ? wearData.formalWear : []);

        if (token) {
          const favData = await getFavorites(token);

          if (Array.isArray(favData)) {
            const favIDs = favData.map(f => f.WearID); // FIXED
            setFavorites(favIDs);
          } else {
            setFavorites([]);
          }
        }
      } catch (err) {
        console.error("Failed to load data:", err);
      }
    }
    fetchData();
  }, [token]);

  const toggleFavorite = async (wearID, e) => {
    e.stopPropagation();
    if (!token) return alert("Login required");

    try {
      if (favorites.includes(wearID)) {
        await removeFavorite(wearID, token);
        setFavorites(favorites.filter(id => id !== wearID));
      } else {
        await addFavorite(wearID, token);
        setFavorites([...favorites, wearID]);
      }
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
    }
  };

  const filter = (cat) => allItems.filter(item => item.Category?.toLowerCase() === cat);

  const openModal = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-2">
      <Navbar />

      <div className="container mx-auto px-6 py-14">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Collections</h2>

        {["suit", "gown", "barong"].map((cat) => {
          const items = filter(cat);
          if (items.length === 0) return null;

          const limitedItems = items.slice(0, 4);

          return (
            <div key={cat} className="mb-12">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-semibold capitalize">{cat}s</h3>

                {items.length > 4 && (
                  <button
                    onClick={() => navigate(`/collections/${cat}`)}
                    className="text-sm px-3 py-1 border border-black rounded hover:bg-black hover:text-white transition"
                  >
                    View All
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {limitedItems.map((item) => (
                  <div
                    key={`wear-${item.ID || item.WearID}`}
                    className="relative bg-white shadow-md rounded-xl overflow-hidden hover:scale-[1.03] transition-transform flex flex-col border-2 border-gray-200 hover:border-gray-700 h-[360px] cursor-pointer"
                    onClick={() => openModal(item)}
                  >
                    <button
                      onClick={(e) => toggleFavorite(item.WearID, e)}
                      className="absolute top-2 right-2 z-20"
                    >
                      {favorites.includes(item.WearID) ? (
                        <HeartIconSolid className="w-7 h-7 text-red-500" />
                      ) : (
                        <HeartIcon className="w-7 h-7 text-gray-400 hover:text-red-400" />
                      )}
                    </button>

                    <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
                      <img
                        src={`http://localhost:5000${item.ImageURL}`}
                        alt={item.Name}
                        className="max-h-full w-auto object-contain"
                      />
                    </div>

                    <div className="p-3 flex flex-col justify-between flex-grow">
                      <p className="font-medium text-[#1A1A1A] line-clamp-1">{item.Name}</p>
                      <p className="text-lg font-semibold text-[#1A1A1A]">₱{item.Price}</p>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          );
        })}
      </div>

      {modalOpen && <CollectionModal item={selectedItem} onClose={() => setModalOpen(false)} />}
    </div>
  );
}

export default Collection;
  