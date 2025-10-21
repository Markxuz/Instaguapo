import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getReservations, deleteReservation } from "../api/ReservationApi";

function Reservation() {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const steps = [
    "Select Items",
    "Book Date",
    "Fit & Get",
    "Confirmed",
    "Return",
    "Complete",
  ];

  const handleNewReservation = () => {
    navigate("/collection");
  };

  const fetchReservations = async () => {
    setLoading(true);
    setError("");
    try {
      const userID = JSON.parse(localStorage.getItem("user"))?.UserID;
      if (!userID) {
        setError("User not logged in.");
        setLoading(false);
        return;
      }

      const data = await getReservations();
      const userReservations = data.filter((res) => res.UserID === userID);
      setReservations(userReservations);
    } catch (err) {
      console.error(err);
      setError("Failed to load reservations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const getStepIndex = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return 1;
      case "confirmed":
        return 3;
      case "return":
        return 4;
      case "completed":
        return 5;
      case "cancelled":
        return 1; // Show as pending/cancelled
      default:
        return 0;
    }
  };

  const handleCancel = async (id) => {
    if (window.confirm("Are you sure you want to cancel this reservation?")) {
      try {
        await deleteReservation(id);
        alert("Reservation cancelled successfully.");
        fetchReservations(); // Refresh list
      } catch (err) {
        console.error(err);
        alert("Failed to cancel reservation.");
      }
    }
  };

  const parseGCashRef = (notes) => {
    return notes?.match(/GCash Ref:\s*(\S+)/)?.[1] || "N/A";
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="pt-24 container mx-auto px-6 py-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Your Reservations</h1>
          <button
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            onClick={handleNewReservation}
          >
            New Reservation
          </button>
        </div>

        {loading && <p>Loading reservations...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && reservations.length === 0 && (
          <p>No reservations found.</p>
        )}

        {!loading &&
          reservations.map((res) => {
            const activeStep = getStepIndex(res.Status);
            const gCashRef = parseGCashRef(res.Notes);

            return (
              <div
                key={res.ReservationID}
                className={`mb-6 border rounded-md p-4 shadow ${
                  res.Status?.toLowerCase() === "cancelled"
                    ? "bg-gray-200 border-gray-400"
                    : "bg-white border-gray-400"
                }`}
              >
                {/* Step Indicator */}
                <div className="flex justify-between items-center text-sm text-center text-gray-700 mb-4">
                  {steps.map((step, i) => (
                    <div key={i} className="flex-1 relative">
                      <div
                        className={`flex items-center justify-center w-6 h-6 mx-auto rounded-full text-xs ${
                          i <= activeStep
                            ? "bg-blue-600 text-white"
                            : "bg-gray-300 text-gray-600"
                        }`}
                      >
                        {i + 1}
                      </div>
                      <div className="mt-2">{step}</div>
                      {i < steps.length - 1 && (
                        <div className="absolute top-3 left-1/2 w-full h-0.5 bg-gray-300 z-[-1]"></div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Reservation Details */}
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <div className="w-full md:w-1/3 text-center">
                    <img
                        src={`http://localhost:5000${res.FormalWearImage}`} // full URL
                        alt={res.FormalWearName}
                        className="w-40 h-auto mx-auto border rounded-lg"
                    />
                    <p className="font-semibold mt-2">
                      {res.FormalWearName || "Formal Wear"}
                    </p>
                    <p>₱{res.Amount || 0}</p>
                  </div>

                  <div className="w-full md:w-2/3 space-y-1">
                    <p className="font-bold text-lg flex items-center">
                      <span className="mr-2">👤</span> {res.UserName}
                    </p>
                    <p>
                      <span className="font-semibold">Reservation Date:</span>{" "}
                      {new Date(res.ReservationDate).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-semibold">Pick-up Date:</span>{" "}
                      {new Date(res.EventDate).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-semibold">Return Date:</span>{" "}
                      {res.ReturnDate
                        ? new Date(res.ReturnDate).toLocaleDateString()
                        : "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Amount:</span> ₱{res.Amount}
                    </p>
                    <p>
                      <span className="font-semibold">GCash Ref:</span> {gCashRef}
                    </p>
                    <p>
                      <span className="font-semibold">Status:</span> {res.Status}
                    </p>

                    {/* Cancel Button (if not already cancelled or completed) */}
                    {res.Status?.toLowerCase() !== "cancelled" &&
                      res.Status?.toLowerCase() !== "completed" && (
                        <button
                          className="mt-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                          onClick={() => handleCancel(res.ReservationID)}
                        >
                          Cancel Reservation
                        </button>
                      )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Reservation;
