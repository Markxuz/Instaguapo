import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/admin/AdminNavbar";
import {
  getReservations,
  updateReservationStatus,
  deleteReservation,
  getMonthlyTotalReservations
} from "../../api/AdminresApi";

const AdDash = () => {
  const [reservations, setReservations] = useState([]);
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [filters, setFilters] = useState({ date: "", time: "", status: "" });
  const navigate = useNavigate();

  useEffect(() => {
    loadReservations();
    loadMonthlyTotal();
  }, []);

  const loadReservations = async () => {
    try {
      const data = await getReservations();
      setReservations(data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadMonthlyTotal = async () => {
    try {
      const total = await getMonthlyTotalReservations();
      setMonthlyTotal(total);
    } catch (err) {
      console.error("Error fetching monthly total:", err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateReservationStatus({ id, status: newStatus });
      setReservations((prev) =>
        prev.map((res) =>
          res.ReservationID === id ? { ...res, Status: newStatus } : res
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteReservation(id);
      setReservations((prev) =>
        prev.filter((res) => res.ReservationID !== id)
      );
    } catch (err) {
      console.error("Error deleting reservation:", err);
    }
  };

  //Filter change and reset
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleResetFilters = () => {
    setFilters({ date: "", time: "", status: "" });
  };

  //filtering logic
  const filteredReservations = reservations.filter((res) => {
    const reservationDate = new Date(res.ReservationDate)
      .toISOString()
      .split("T")[0];
    return (
      (!filters.status || res.Status === filters.status) &&
      (!filters.date || reservationDate === filters.date)
    );
  });

  // ✅ Summary data
  const todayReservations = reservations.filter(
    (res) =>
      new Date(res.ReservationDate).toDateString() ===
      new Date().toDateString()
  ).length;
  const pendingRequests = reservations.filter(
    (res) => res.Status === "pending"
  ).length;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <AdminNavbar />

      {/* ✅ Filters Section */}
      <div className="bg-white border border-gray-500 rounded-lg p-6 mb-8 shadow-sm mt-10">
        <h2 className="text-lg font-bold mb-4">Filters</h2>

        <div className="flex flex-wrap justify-center items-end gap-4 max-w-3xl mx-auto">
          {/* Date Filter */}
          <div className="flex flex-col items-center">
            <label className="text-sm font-medium text-black mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
              className="border px-3 py-2 rounded-md w-40 text-sm"
            />
          </div>

          {/* Time Filter */}
          <div className="flex flex-col items-center">
            <label className="text-sm font-medium text-black mb-1">Time</label>
            <select
              name="time"
              value={filters.time}
              onChange={handleFilterChange}
              className="border px-3 py-2 rounded-md w-40 text-sm"
            >
              <option value="">Select</option>
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex flex-col items-center">
            <label className="text-sm font-medium text-black mb-1">Status</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="border px-3 py-2 rounded-md w-40 text-sm"
            >
              <option value="">Select</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* ✅ Clear Filters Button (smaller + aligned) */}
          <div className="flex items-center">
            <button
              onClick={handleResetFilters}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-3 py-1.5 rounded-md text-xs border transition"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div
          onClick={() => navigate("/admin/reservation")}
          className="bg-white border border-gray-500 rounded-lg shadow-sm p-6 cursor-pointer hover:bg-gray-100 transition"
        >
          <h3 className="text-lg font-semibold mb-2">
            Total Reservations (This Month)
          </h3>
          <p className="text-3xl font-bold text-gray-700 text-center">
            {monthlyTotal}
          </p>
        </div>

        <div
          onClick={() => navigate("/admin/reservation")}
          className="bg-white border border-gray-500 rounded-lg shadow-sm p-6 cursor-pointer hover:bg-gray-100 transition"
        >
          <h3 className="text-lg font-semibold mb-2">Today's Reservation</h3>
          <p className="text-3xl font-bold text-gray-700 text-center">
            {todayReservations}
          </p>
        </div>

        <div
          onClick={() => navigate("/admin/reservation")}
          className="bg-white border border-gray-500 rounded-lg shadow-sm p-6 cursor-pointer hover:bg-gray-100 transition"
        >
          <h3 className="text-lg font-semibold mb-2">Pending Requests</h3>
          <p className="text-3xl font-bold text-gray-700 text-center">
            {pendingRequests}
          </p>
        </div>
      </div>

      {/* ✅ Table Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Recent Reservation</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border">Customer</th>
                <th className="py-2 px-4 border">Date of Reservation</th>
                <th className="py-2 px-4 border">Date of Pick Up</th>
                <th className="py-2 px-4 border">Date of Return</th>
                <th className="py-2 px-4 border">Wear</th>
                <th className="py-2 px-4 border">Amount</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.map((res) => (
                <tr key={res.ReservationID}>
                  <td className="py-2 px-4 border">{res.Customer}</td>
                  <td className="py-2 px-4 border">
                    {new Date(res.ReservationDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border">
                    {new Date(res.EventDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border">
                    {new Date(res.ReturnDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border">{res.WearName}</td>
                  <td className="py-2 px-4 border">
                    ₱{Number(res.Amount).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border">
                    <select
                      value={res.Status}
                      onChange={(e) =>
                        handleStatusChange(res.ReservationID, e.target.value)
                      }
                      className="border rounded px-2 py-1"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                  <td className="py-2 px-4 border font-bold">
                    <button
                      onClick={() => handleDelete(res.ReservationID)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdDash;
