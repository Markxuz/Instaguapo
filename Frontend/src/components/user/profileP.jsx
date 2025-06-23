import { useRef, useState } from "react";
import { FiUser, FiEdit2 } from "react-icons/fi";

function ProfilePhoto() {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center mb-8">
      <div className="relative">
        <div className="w-24 h-24 rounded-full border-2 border-gray-300 flex items-center justify-center bg-gray-100 overflow-hidden">
          {image ? (
            <img
              src={image}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <FiUser className="text-6xl text-gray-400" />
          )}
        </div>
        <button
          type="button"
          onClick={handleEditClick}
          className="absolute bottom-2 right-2 bg-white border border-gray-300 rounded-full p-1 hover:bg-gray-100"
        >
          <FiEdit2 className="text-gray-600 text-lg" />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>
      <span className="mt-2 text-sm text-gray-700">Profile Photo</span>
    </div>
  );
}

export default ProfilePhoto;
