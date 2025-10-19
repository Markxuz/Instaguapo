import { useState } from "react";
import { addFormalWear } from "../../../api/FormalWearApi";

const AddFormalWearModal = ({ onClose, onSuccess, defaultCategory ="" }) => {
  const [formData, setFormData] = useState({
    Name: "",
    Category: defaultCategory,
    Size: "",
    Price: "",
    Description: "",
    ImageURL: null, // file upload
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, ImageURL: e.target.files[0] }); // file object
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addFormalWear(formData); //sends FormData
      alert("Formal wear added!");
      if (onSuccess) onSuccess(); //reload collection after adding
      onClose();
    } catch (err) {
      console.error("Error adding formal wear:", err);
      alert("Error adding item.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white w-96 rounded-lg p-6 relative">
        <button className="absolute top-3 right-3 text-xl" onClick={onClose}>
          ✖
        </button>
        <h2 className="text-lg font-bold mb-4">Add New Formal Wear</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="Name"
            placeholder="Name"
            value={formData.Name}
            onChange={handleChange}
            className="border w-full p-2"
            required
          />
          <select
            name="Category"
            value={formData.Category}
            onChange={handleChange}
            className="border w-full p-2"
            required
          >
            <option value="">Select Category</option>
            <option value="suit">Suit</option>
            <option value="gown">Gown</option>
            <option value="barong">Barong</option>
          </select>
          <input
            type="text"
            name="Size"
            placeholder="Size"
            value={formData.Size}
            onChange={handleChange}
            className="border w-full p-2"
          />
          <input
            type="number"
            name="Price"
            placeholder="Price"
            value={formData.Price}
            onChange={handleChange}
            className="border w-full p-2"
            required
          />
          <textarea
            name="Description"
            placeholder="Description"
            value={formData.Description}
            onChange={handleChange}
            className="border w-full p-2"
          />
          <input
            type="file"
            name="ImageURL"
            onChange={handleFileChange}
            className="border w-full p-2"
            required
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded w-full"
          >
            ADD
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFormalWearModal;
