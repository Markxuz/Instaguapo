import { useState } from "react";
import AddFormalWearModal from "./AddFormalWearModal";

const EditAllModal = ({ category, items, onClose }) => {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-11/12 max-w-4xl rounded-lg p-6 relative">
        <button className="absolute top-3 right-3 text-xl" onClick={onClose}>
          ✖
        </button>
        <h2 className="text-lg font-bold mb-4">Edit {category}</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Add new card */}
          <div
            className="border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100"
            onClick={() => setShowAddModal(true)}
          >
            <span className="text-4xl">＋</span>
            <p className="font-semibold">Add</p>
          </div>

          {/* Existing items */}
          {items.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-2 shadow hover:shadow-lg relative"
            >
              <img src={item.ImageURL} alt={item.Name} className="h-32 w-full object-cover" />
              <p className="font-semibold mt-2">{item.Name}</p>
              <p>₱{item.Price}</p>
              <p
                className={`text-sm mt-1 ${
                  item.Availability === "Available" ? "text-green-600" : "text-red-600"
                }`}
              >
                {item.Availability}
              </p>
            </div>
          ))}
        </div>

        {/* Add item modal */}
        {showAddModal && <AddFormalWearModal category={category} onClose={() => setShowAddModal(false)} />}
      </div>
    </div>
  );
};

export default EditAllModal;
