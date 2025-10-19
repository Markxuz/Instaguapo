import { FaHeart } from "react-icons/fa";
import { deleteFormalWear } from "../../../api/FormalWearApi";

const FormalWearCard = ({ item, onDelete }) => {
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteFormalWear(item.WearID);
        if (onDelete) onDelete(item.WearID); 
        alert("Formal wear deleted!");
      } catch (err) {
        console.error(err);
        alert("Error deleting item.");
      }
    }
  };

  return (
    <div className="relative bg-white border rounded-lg shadow-sm p-4 w-60">
      {item.status === "unavailable" && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 text-red-600 text-xl font-bold">
          Not Available
        </div>
      )}

      <div className="flex justify-center mb-3">
        <img
          src={`http://localhost:5000${item.ImageURL}`}
          alt={item.Name}
          className="h-40 object-contain"
        />
      </div>

      <h3 className="text-sm font-semibold text-gray-800">{item.Name}</h3>

      <p className="text-gray-600 font-bold">₱{item.Price}</p>

      <div className="mt-2 flex items-center justify-between">
        <button className="bg-black text-white text-sm px-3 py-1 rounded hover:bg-gray-800">
          Details
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
        <button>
          <FaHeart className="text-gray-400 hover:text-red-500" />
        </button>
      </div>
    </div>
  );
};

export default FormalWearCard;
