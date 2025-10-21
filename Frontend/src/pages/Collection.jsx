import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CollectionModal from "../components/modal/CollectionModal";
import { getFormalWear } from "../api/FormalWearApi";

function Collection() {
  const [allItems, setAllItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    async function fetchItems() {
      try {
        const data = await getFormalWear();
        setAllItems(data);
      } catch (err) {
        console.error("Failed to fetch items:", err);
      }
    }
    fetchItems();
  }, []);

  const handleReserveClick = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  // Pang group sa mga items (Suits, Barong, Gowns)
  const groupedItems = allItems.reduce((groups, item) => {
    const category = item.Category || "Uncategorized";
    if (!groups[category]) groups[category] = [];
    groups[category].push(item);
    return groups;
  }, {});

  return (
    <div className="min-h-screen bg-gray-100 pt-2">
      <Navbar />

      <div className="container mx-auto px-6 py-14">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Collections</h2>

        {Object.keys(groupedItems).length === 0 ? (
          <p className="text-gray-500 text-center">No items available.</p>
        ) : (
          Object.keys(groupedItems).map((category) => (
            <div key={category} className="mb-12">
              <h3 className="text-2xl font-semibold mb-6 capitalize">
                {category}s
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {groupedItems[category].map((item) => (
                  <div
                    key={item.WearID}
                    className="bg-white shadow-md rounded-lg p-4 border-4 border-gray-400 hover:border-black transition-all duration-300"
                  >
                    <div className="h-40 bg-gray-200 rounded overflow-hidden flex items-center justify-center">
                      <img
                        src={`http://localhost:5000${item.ImageURL}`}
                        alt={item.Name}
                        className="object-contain max-h-full"
                      />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-gray-800">
                      {item.Name}
                    </h3>
                    <p className="text-gray-600 font-semibold">₱{item.Price}</p>
                    <button
                      className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-700"
                      onClick={() => handleReserveClick(item)}
                    >
                      Reserve Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {modalOpen && (
        <CollectionModal item={selectedItem} onClose={closeModal} />
      )}
    </div>
  );
}

export default Collection;
