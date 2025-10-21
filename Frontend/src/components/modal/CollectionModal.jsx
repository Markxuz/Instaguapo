import { FiSettings, FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";

const CollectionModal = ({ item, onClose }) => {
  const user = JSON.parse(localStorage.getItem("user")); // ✅ get logged-in user

  if (!item) return null;

  return (
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
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>

        <div className="flex flex-col items-center">
          <div className="border rounded-lg p-2 mb-2 relative w-48 h-48 flex items-center justify-center bg-gray-100">
            <img
              src={`http://localhost:5000${item.ImageURL}`}
              alt={item.Name}
              className="object-contain max-h-full max-w-full"
            />
          </div>

          {/* Details */}
          <div className="mb-1 font-bold text-lg">₱{item.Price}</div>
          <div className="mb-1">{item.Name}</div>
          <div className="mb-1 text-sm">Size: {item.Size || "N/A"}</div>
          <button className="border px-2 py-1 rounded text-xs mb-2">
            True to Size
          </button>

          <div className="flex items-center mb-2">
            <span className="flex items-center text-xs mr-2">
              <FiSettings className="mr-1" /> Customization
            </span>
            <FiHeart className="text-blue-600 text-xl cursor-pointer" />
          </div>

          {/* ✅ Pass user and selectedItem */}
          <Link to="/Rprocess" state={{ user, selectedItem: item }}>
            <button className="mt-4 px-4 py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-700">
              RESERVE NOW
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CollectionModal;
