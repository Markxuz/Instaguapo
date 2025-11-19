import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../Navbar";
import { getFavorites, addFavorite, removeFavorite } from "../../api/FavoriteApi";

function Favorites() {
  const navigate = useNavigate();
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const token = localStorage.getItem("token");

  const fetchFavorites = async () => {
    setLoading(true);
    const data = await getFavorites(token);
    setFavoriteItems(data || []);
    setLoading(false);
  };

  useEffect(() => {
    if (!token) navigate("/login");
    fetchFavorites();
  }, []);

  const handleToggleFavorite = async (item) => {
    const isFavorite = favoriteItems.some(
      (f) => Number(f.WearID) === Number(item.WearID)
    );

    if (isFavorite) {
      await removeFavorite(item.WearID, token);
    } else {
      await addFavorite(item.WearID, token);
    }

    fetchFavorites();
  };

  const categories = ["all", "gown", "suit", "barong"];

  const filteredFavorites =
    selectedCategory === "all"
      ? favoriteItems
      : favoriteItems.filter(
          (item) =>
            item.Category?.toLowerCase() === selectedCategory.toLowerCase()
        );

  if (loading) return <p className="text-center mt-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <Navbar />

      <div className="px-6 py-6">
        {/* HEADER */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-xl mr-4 font-bold hover:text-gray-600"
          >
            ←
          </button>
          <h1 className="text-2xl font-bold">My Favorites</h1>
        </div>

        {/* CATEGORY FILTER */}
        <div className="flex gap-3 mb-6 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                selectedCategory === cat
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {cat === "all"
                ? "All"
                : cat.charAt(0).toUpperCase() + cat.slice(1) + "s"}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        {filteredFavorites.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            No items found for this category.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFavorites.map((item) => (
              <div
                key={item.FavoriteID}
                className="bg-white rounded-xl shadow-md p-4 relative"
              >
                {/* Heart Button */}
                <button
                  onClick={() => handleToggleFavorite(item)}
                  className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur rounded-full shadow flex items-center justify-center hover:bg-gray-100 transition"
                >
                  <FaHeart className="text-red-500 text-xl" />
                </button>

                {/* Image */}
                <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden mb-4 flex items-center justify-center">
                  <img
                    src={`http://localhost:5000${item.ImageURL}`}
                    alt={item.Name}
                    className="h-full w-auto object-cover"
                  />
                </div>

                {/* Info */}
                <h2 className="font-semibold text-lg">{item.Name}</h2>
                <p className="text-gray-700 font-medium mb-3">₱ {item.Price}</p>

                {/* Button */}
                <Link to="/collections">
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                    Reserve Now
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
