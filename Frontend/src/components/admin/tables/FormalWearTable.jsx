import React from "react";

const FormalWearTable = ({ wears, onEdit, onDelete, onToggleAvailability }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {wears.map((wear) => (
        <div
          key={wear.id}
          className="bg-white border rounded-lg shadow p-4 flex flex-col items-center relative"
        >

          <button
            onClick={() => onDelete(wear.id)}
            className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
          >
            🗑
          </button>


          <div className="w-32 h-40 flex items-center justify-center mb-3">
            <img
              src={wear.imageUrl}
              alt={wear.name}
              className={`max-h-full object-contain ${
                !wear.available ? "opacity-50" : ""
              }`}
            />
          </div>


          {!wear.available && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 text-red-600 font-bold text-lg">
              Not Available
            </div>
          )}


          <h3 className="font-semibold text-gray-800">{wear.name}</h3>
          <p className="text-gray-600">₱{wear.price}</p>


          <button
            onClick={() => onToggleAvailability(wear.id)}
            className={`mt-2 px-3 py-1 text-sm font-bold rounded ${
              wear.available
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            {wear.available ? "Available" : "Not Available"}
          </button>


          <button
            onClick={() => onEdit(wear)}
            className="mt-2 text-blue-600 hover:underline text-sm"
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
};

export default FormalWearTable;
