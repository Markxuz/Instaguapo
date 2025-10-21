import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createReservation, getBookedDates } from "../api/ReservationApi";

function Rprocess() {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Get user and item from React Router state
  const { user, selectedItem } = location.state || {};

  const [reservationDate, setReservationDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const [gcashReference, setGcashReference] = useState("");
  const [showTerms, setShowTerms] = useState(false);

  // ✅ Redirect if missing user or item
  useEffect(() => {
    if (!user || !selectedItem) {
      alert("Missing reservation details. Redirecting...");
      navigate("/collection");
    }
  }, [user, selectedItem, navigate]);

  // ✅ Fetch booked dates for this specific formal wear
  useEffect(() => {
    async function fetchBookedDates() {
      try {
        if (!selectedItem?.WearID) return;
        const data = await getBookedDates(selectedItem.WearID);

        const disabled = [];
        data.forEach(({ ReservationDate, EventDate }) => {
          let start = new Date(ReservationDate);
          let end = new Date(EventDate);
          while (start <= end) {
            disabled.push(new Date(start));
            start.setDate(start.getDate() + 1);
          }
        });

        setBookedDates(disabled);
      } catch (err) {
        console.error("Error fetching booked dates:", err);
      }
    }

    fetchBookedDates();
  }, [selectedItem]);

  // ✅ Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!reservationDate || !returnDate) {
      alert("Please select both Reservation and Return dates.");
      return;
    }

    setShowTerms(true); // open terms modal before saving
  };

  // ✅ Confirm reservation after accepting terms
  const confirmReservation = async () => {
    try {
      const formattedReservationDate = reservationDate
        .toISOString()
        .split("T")[0];
      const formattedReturnDate = returnDate.toISOString().split("T")[0];

      await createReservation({
        UserID: user.UserID, // ✅ valid user ID
        WearID: selectedItem.WearID,
        ReservationDate: formattedReservationDate,
        EventDate: formattedReturnDate, // using EventDate as ReturnDate
        Status: "pending",
        Notes: `GCash Ref: ${gcashReference}`,
      });

      alert("Reservation submitted successfully!");
      setShowTerms(false);
      navigate("/reservation");
    } catch (err) {
      console.error("Reservation Error:", err);
      alert("Error creating reservation. Please try again.");
    }
  };

  if (!selectedItem) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="container mx-auto p-6 mt-10 bg-white rounded-lg shadow-md max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Reservation Process
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* FORMAL WEAR DETAILS */}
          <div className="text-center">
            <img
              src={`http://localhost:5000${selectedItem?.ImageURL}`}
              alt={selectedItem?.Name}
              className="mx-auto h-48 object-contain rounded"
            />
            <h3 className="font-bold mt-2">{selectedItem?.Name}</h3>
            <p className="text-gray-600">₱{selectedItem?.Price}</p>
          </div>

          {/* DATES */}
          <div>
            <label className="block font-semibold mb-1">
              Reservation Date:
            </label>
            <DatePicker
              selected={reservationDate}
              onChange={(date) => setReservationDate(date)}
              minDate={new Date()}
              excludeDates={bookedDates}
              placeholderText="Select reservation date"
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Return Date:</label>
            <DatePicker
              selected={returnDate}
              onChange={(date) => setReturnDate(date)}
              minDate={reservationDate || new Date()}
              excludeDates={bookedDates}
              placeholderText="Select return date"
              className="border p-2 rounded w-full"
            />
          </div>

          {/* GCASH PAYMENT */}
          <div>
            <label className="block font-semibold mb-1">
              Gcash Reference Number:
            </label>
            <input
              type="text"
              value={gcashReference}
              onChange={(e) => setGcashReference(e.target.value)}
              placeholder="Enter your GCash reference number"
              className="border p-2 rounded w-full"
              required
            />
          </div>

          <div className="text-center">
            <img
              src="/images/qr1.png"
              alt="Gcash QR"
              className="mx-auto h-40 object-contain my-3"
            />
            <p className="text-sm text-gray-500">
              Scan this QR to pay before confirming.
            </p>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded w-full hover:bg-gray-800"
          >
            Submit Reservation
          </button>
        </form>
      </div>

      {/* TERMS MODAL */}
      {showTerms && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[400px] shadow-xl">
            <h3 className="text-xl font-bold mb-4">Terms and Conditions</h3>
            <p className="text-sm text-gray-700 mb-4">
              By submitting this reservation, you agree that cancellations must
              be made at least 3 days before the reservation date. Payment is
              non-refundable after confirmation.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowTerms(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmReservation}
                className="px-4 py-2 bg-black text-white rounded"
              >
                Agree & Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Rprocess;
