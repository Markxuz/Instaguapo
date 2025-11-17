import React, { useState, useEffect } from "react";
import { uploadBackgroundImage, getBackgroundImage } from "../../api/AdminApi";

function AdminBackgroundSettings() {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const token = localStorage.getItem("token"); // assuming you store the admin token here

  useEffect(() => {
    async function fetchBackground() {
      const data = await getBackgroundImage();
      if (data.backgroundImage) {
        setCurrentImage(`http://localhost:5000${data.backgroundImage}`);
      }
    }
    fetchBackground();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image first");
      return;
    }
    const formData = new FormData();
    formData.append("background", file);
    const result = await uploadBackgroundImage(formData, token);
    alert(result.message);
    setCurrentImage(`http://localhost:5000${result.backgroundImage}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Change Background Image</h2>

      {currentImage && (
        <div className="mb-4">
          <p>Current Background:</p>
          <img
            src={currentImage}
            alt="Current Background"
            className="w-full max-w-md rounded-lg shadow"
          />
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />
      {preview && (
        <div className="mb-4">
          <p>Preview:</p>
          <img
            src={preview}
            alt="Preview"
            className="w-full max-w-md rounded-lg shadow"
          />
        </div>
      )}
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Upload New Background
      </button>
    </div>
  );
}

export default AdminBackgroundSettings;
