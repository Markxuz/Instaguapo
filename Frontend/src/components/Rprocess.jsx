import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createReservation, getBookedDates } from "../api/ReservationApi";

function Rprocess() {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, selectedItem } = location.state || {};

  const [reservationDate, setReservationDate] = useState(null);
  const [pickUpDate, setPickUpDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const [gcashReference, setGcashReference] = useState("");
  const [showTerms, setShowTerms] = useState(false);

  // Para sa missing na reservation details
  useEffect(() => {
    if (!user || !selectedItem) {
      alert("Missing reservation details. Redirecting...");
      navigate("/collection");
    }
  }, [user, selectedItem, navigate]);


  const getDateRange = (start, end) => {
    const range = [];
    const current = new Date(start);
    while (current <= new Date(end)) {
      range.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return range;
  };


  useEffect(() => {
    async function fetchBookedDates() {
      try {
        if (!selectedItem?.WearID) return;
        const data = await getBookedDates(selectedItem.WearID);

        const allBooked = [];
        data.forEach(({ ReservationDate, ReturnDate }) => {
          if (ReservationDate && ReturnDate) {
            const range = getDateRange(ReservationDate, ReturnDate);
            allBooked.push(...range);
          }
        });

        setBookedDates(allBooked);
      } catch (err) {
        console.error("Error fetching booked dates:", err);
      }
    }

    fetchBookedDates();
  }, [selectedItem]);

  
  const isDateBooked = (date) =>
    bookedDates.some(
      (booked) => booked.toDateString() === date.toDateString()
    );

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!reservationDate || !pickUpDate || !returnDate) {
      alert("Please select Reservation, Pick-up, and Return dates.");
      return;
    }

    setShowTerms(true);
  };

  // Confirm reservation
  const confirmReservation = async () => {
    try {
      const formattedReservationDate = reservationDate
        .toISOString()
        .split("T")[0];
      const formattedPickUpDate = pickUpDate.toISOString().split("T")[0];
      const formattedReturnDate = returnDate.toISOString().split("T")[0];

      await createReservation({
        UserID: user.UserID,
        WearID: selectedItem.WearID,
        ReservationDate: formattedReservationDate,
        EventDate: formattedPickUpDate,
        ReturnDate: formattedReturnDate,
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
          {/* Formal Wear */}
          <div className="text-center">
            <img
              src={`http://localhost:5000${selectedItem?.ImageURL}`}
              alt={selectedItem?.Name}
              className="mx-auto h-48 object-contain rounded"
            />
            <h3 className="font-bold mt-2">{selectedItem?.Name}</h3>
            <p className="text-gray-600">₱{selectedItem?.Price}</p>
          </div>

          {/* Reservation Date */}
          <div>
            <label className="block font-semibold mb-1">Reservation Date:</label>
            <DatePicker
              selected={reservationDate}
              onChange={(date) => setReservationDate(date)}
              minDate={new Date()}
              excludeDates={bookedDates}
              placeholderText="Select reservation date"
              dayClassName={(date) =>
                isDateBooked(date)
                  ? "bg-red-500 text-white rounded-full cursor-not-allowed"
                  : undefined
              }
              filterDate={(date) => !isDateBooked(date)}
              className="border p-2 rounded w-full"
            />
          </div>

          {/* Pick-up Date */}
          <div>
            <label className="block font-semibold mb-1">Pick-up Date:</label>
            <DatePicker
              selected={pickUpDate}
              onChange={(date) => setPickUpDate(date)}
              minDate={reservationDate || new Date()}
              excludeDates={bookedDates}
              placeholderText="Select pick-up date"
              dayClassName={(date) =>
                isDateBooked(date)
                  ? "bg-red-500 text-white rounded-full cursor-not-allowed"
                  : undefined
              }
              filterDate={(date) => !isDateBooked(date)}
              className="border p-2 rounded w-full"
            />
          </div>

          {/* Return Date */}
          <div>
            <label className="block font-semibold mb-1">Return Date:</label>
            <DatePicker
              selected={returnDate}
              onChange={(date) => setReturnDate(date)}
              minDate={pickUpDate || reservationDate || new Date()}
              excludeDates={bookedDates}
              placeholderText="Select return date"
              dayClassName={(date) =>
                isDateBooked(date)
                  ? "bg-red-500 text-white rounded-full cursor-not-allowed"
                  : undefined
              }
              filterDate={(date) => !isDateBooked(date)}
              className="border p-2 rounded w-full"
            />
          </div>

          {/* GCash */}
          <div>
            <label className="block font-semibold mb-1">
              GCash Reference Number:
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

          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded w-full hover:bg-gray-800"
          >
            Submit Reservation
          </button>
        </form>
      </div>

      {/* Terms Modal */}
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
