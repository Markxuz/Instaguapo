import { useState, useEffect } from "react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { getFormalWear } from "../../api/FormalWearApi";
import AddFormalWearModal from "../../components/admin/modals/AddFormalWearModal";
import FormalWearCard from "../../components/admin/cards/FormalWearCard";

const AdminCollection = () => {
  const [formalWear, setFormalWear] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const loadFormalWear = async () => {
    try {
      const data = await getFormalWear();
      setFormalWear(data);
    } catch (err) {
      console.error("Error fetching formal wear:", err);
    }
  };

  useEffect(() => {
    loadFormalWear();
  }, []);

  const suits = formalWear.filter((item) => item.Category === "suit");
  const gowns = formalWear.filter((item) => item.Category === "gown");
  const barongs = formalWear.filter((item) => item.Category === "barong");

  const renderCategory = (title, items, categoryKey) => (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button
          onClick={() => {
            setSelectedCategory(categoryKey);
            setIsAddModalOpen(true);
          }}
          className="bg-black text-white px-3 py-1 rounded text-sm"
        >
          + Add {title}
        </button>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <FormalWearCard key={item.WearID} item={item} onDelete={loadFormalWear} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600 border border-dashed border-gray-400 rounded p-6">
          <p>No {title.toLowerCase()} yet.</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />

      <div className="p-6 pt-15">
        <h1 className="text-2xl font-bold mb-6">Collections</h1>

        {renderCategory("Suits", suits, "suit")}
        {renderCategory("Barongs", barongs, "barong")}
        {renderCategory("Gowns", gowns, "gown")}
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <AddFormalWearModal
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={loadFormalWear}
          defaultCategory={selectedCategory}
        />
      )}
    </div>
  );
};

export default AdminCollection;
