import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { createReservation } from "../api/ReservationApi";

function Rprocess() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedWear = location.state?.item; // data passed from Collection

  const [formData, setFormData] = useState({
    ReturnDate: "",
    Notes: "", // GCash Reference number
  });

  const [loading, setLoading] = useState(false);
  const [showTerms, setShowTerms] = useState(false); // Modal toggle

  // Get logged-in user ID from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user ? user.UserID : null;

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userID) {
      alert("Please log in first before reserving.");
      return;
    }

    if (!formData.ReturnDate) {
      alert("Please select a return date.");
      return;
    }

    // Open the terms modal before confirming
    setShowTerms(true);
  };

  const confirmReservation = async () => {
    setLoading(true);
    try {
      await createReservation({
        UserID: userID,
        WearID: selectedWear.WearID,
        AdminID: null,
        ReservationDate: new Date().toISOString().split("T")[0], // today
        EventDate: formData.ReturnDate, // we’ll use this as return date in DB
        Status: "pending",
        Notes: formData.Notes,
      });

      alert("Reservation submitted successfully! Pending approval.");
      navigate("/reservation");
    } catch (err) {
      console.error(err);
      alert("Error submitting reservation. Please try again.");
    } finally {
      setLoading(false);
      setShowTerms(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-lg mx-auto mt-24 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Reserve Formal Wear</h2>

        {/* Formal Wear Details */}
        {selectedWear ? (
          <div className="mb-6 text-center">
            <img
              src={`http://localhost:5000${selectedWear.ImageURL}`}
              alt={selectedWear.Name}
              className="h-40 mx-auto object-contain mb-2"
            />
            <h3 className="text-xl font-semibold">{selectedWear.Name}</h3>
            <p className="text-gray-600 font-medium">₱{selectedWear.Price}</p>
          </div>
        ) : (
          <p className="text-center text-gray-500">No formal wear selected.</p>
        )}

        {/* GCash QR */}
        <div className="mb-6 text-center">
          <p className="font-semibold mb-2">Scan to Pay via GCash</p>
          <img
            src="/images/qr1.png"
            alt="GCash QR"
            className="h-40 w-40 mx-auto rounded-lg border"
          />
        </div>

        {/* Reservation Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Return Date */}
          <div>
            <label className="block text-gray-700 mb-1">Return Date</label>
            <input
              type="date"
              name="ReturnDate"
              value={formData.ReturnDate}
              onChange={(e) =>
                setFormData({ ...formData, ReturnDate: e.target.value })
              }
              className="border rounded w-full p-2"
              required
            />
          </div>

          {/* GCash Reference Number */}
          <div>
            <label className="block text-gray-700 mb-1">
              GCash Reference Number
            </label>
            <input
              type="text"
              name="Notes"
              placeholder="Enter GCash Reference #"
              value={formData.Notes}
              onChange={(e) =>
                setFormData({ ...formData, Notes: e.target.value })
              }
              className="border rounded w-full p-2"
            />
          </div>

          <button
            type="submit"
            className="bg-black text-white w-full py-2 rounded hover:bg-gray-800 disabled:bg-gray-400"
          >
            {loading ? "Submitting..." : "Submit Reservation"}
          </button>
        </form>
      </div>

      {/* Terms & Conditions Modal */}
      {showTerms && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white w-96 rounded-lg p-6 relative">
            <button
              className="absolute top-3 right-3 text-xl"
              onClick={() => setShowTerms(false)}
            >
              ✖
            </button>
            <h3 className="text-lg font-bold mb-3">Terms and Conditions</h3>
            <p className="text-sm text-gray-700 mb-4 overflow-y-auto h-40">
              {/* You can replace this with your real terms text */}
              1. Please handle the formal wear with care. <br />
              2. Return the formal wear on or before the selected return date. <br />
              3. Late returns may incur additional charges. <br />
              4. Reservation will only be processed once payment is confirmed. <br />
              5. Cancellations must be made at least 24 hours before event date.
            </p>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setShowTerms(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={confirmReservation}
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
              >
                I Agree
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Rprocess;
