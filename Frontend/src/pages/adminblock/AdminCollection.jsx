import { useState, useEffect } from "react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { getFormalWear, deleteFormalWear } from "../../api/FormalWearApi";
import AddFormalWearModal from "../../components/admin/modals/AddFormalWearModal";
import { useNavigate } from "react-router-dom";

const AdminCollection = () => {
  const [formalWear, setFormalWear] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const navigate = useNavigate();

  const loadFormalWear = async () => {
    try {
      const data = await getFormalWear();
      setFormalWear(Array.isArray(data.formalWear) ? data.formalWear : []);
    } catch (err) {
      console.error("Error fetching formal wear:", err);
      setFormalWear([]);
    }
  };

  useEffect(() => {
    loadFormalWear();
  }, []);

  const getByCategory = (category) =>
    formalWear.filter((item) => item.Category?.toLowerCase() === category);

  const renderCategory = (title, categoryKey) => {
    const items = getByCategory(categoryKey);
    const limitedItems = items.slice(0, 4);

    const handleEdit = (item) => {
      navigate(`/admin/edit-formal-wear/${item.WearID}`);
    };

    const handleDelete = async (id) => {
      if (window.confirm("Are you sure you want to delete this item?")) {
        await deleteFormalWear(id);
        loadFormalWear();
      }
    };

    return (
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold capitalize">{title}</h2>

          <div className="flex gap-2">
            {items.length > 4 && (
              <button
                onClick={() => navigate(`/admin/collections/${categoryKey}`)}
                className="text-sm px-3 py-1 border border-black rounded hover:bg-black hover:text-white transition"
              >
                View All
              </button>
            )}

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
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {limitedItems.map((item) => (
              <div
                key={item.WearID}
                className="cursor-pointer bg-white shadow-md rounded-xl overflow-hidden hover:scale-[1.03] transition-transform flex flex-col border-2 border-gray-200 hover:border-gray-700 h-[360px]"
              >
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

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(item)}
                      className="flex-1 bg-blue-900 text-white py-0.5 rounded-lg hover:bg-blue-500 transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(item.WearID)}
                      className="flex-1 bg-red-900 text-white py-0.5 rounded-lg hover:bg-red-500 transition"
                    >
                      Delete
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 border border-dashed border-gray-400 rounded p-6">
            No {title.toLowerCase()} yet.
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />

      <div className="p-6 pt-15">
        <h1 className="text-2xl font-bold mb-6">Collections</h1>

        {renderCategory("Suits", "suit")}
        {renderCategory("Barongs", "barong")}
        {renderCategory("Gowns", "gown")}
      </div>

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
