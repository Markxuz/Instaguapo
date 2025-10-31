import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/admin/AdminNavbar";
import {
  getReservations,
  updateReservationStatus,
  deleteReservation,
  getMonthlyTotalReservations,
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

  // Filter change and reset
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleResetFilters = () => {
    setFilters({ date: "", time: "", status: "" });
  };

  // Filtering logic
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

      {/* ✅ Filters Section (modern look) */}
      <div className="bg-white border border-gray-300 rounded-xl shadow-md p-6 mb-10 mt-10">
        <h2 className="text-lg font-bold mb-6 text-gray-800">
          Filter Reservations
        </h2>

        <div className="flex flex-wrap justify-center items-end gap-6 max-w-4xl mx-auto">
          {/* Date Filter */}
          <div className="flex flex-col items-start">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
              className="border border-gray-300 px-3 py-2 rounded-lg w-44 text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          {/* Time Filter */}
          <div className="flex flex-col items-start">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Time
            </label>
            <select
              name="time"
              value={filters.time}
              onChange={handleFilterChange}
              className="border border-gray-300 px-3 py-2 rounded-lg w-44 text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
            >
              <option value="">Select</option>
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex flex-col items-start">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="border border-gray-300 px-3 py-2 rounded-lg w-44 text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
            >
              <option value="">Select</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Clear Filters Button */}
          <div className="flex items-center">
            <button
              onClick={handleResetFilters}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-lg text-sm border border-gray-300 transition"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div
          onClick={() => navigate("/admin-reservation")}
          className="bg-white border border-gray-300 rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold mb-2 text-gray-700">
            Total Reservations (This Month)
          </h3>
          <p className="text-4xl font-bold text-center">
            {monthlyTotal}
          </p>
        </div>

        <div
          onClick={() => navigate("/admin-reservation")}
          className="bg-white border border-gray-300 rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold mb-2 text-gray-700">
            Today's Reservations
          </h3>
          <p className="text-4xl font-bold text-center">
            {todayReservations}
          </p>
        </div>

        <div
          onClick={() => navigate("/admin-reservation")}
          className="bg-white border border-gray-300 rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold mb-2 text-gray-700">
            Pending Requests
          </h3>
          <p className="text-4xl font-bold text-center">
            {pendingRequests}
          </p>
        </div>
      </div>

      {/* ✅ Table Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Recent Reservations
        </h2>

        <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-md">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gradient-to-r from-slate-500 to-gray-400 text-white text-sm uppercase">
              <tr>
                <th className="py-3 px-4 text-center">Customer</th>
                <th className="py-3 px-4 text-center">Reservation Date</th>
                <th className="py-3 px-4 text-center">Pick-Up Date</th>
                <th className="py-3 px-4 text-center">Return Date</th>
                <th className="py-3 px-4 text-center">Wear</th>
                <th className="py-3 px-4 text-center">Amount</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {filteredReservations.length > 0 ? (
                filteredReservations.map((res) => (
                  <tr
                    key={res.ReservationID}
                    className="hover:bg-gray-50 transition duration-150"
                  >
                    <td className="py-3 px-4 text-center font-medium">
                      {res.Customer}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {new Date(res.ReservationDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {new Date(res.EventDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {new Date(res.ReturnDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-center">{res.WearName}</td>
                    <td className="py-3 px-4 text-center font-semibold text-gray-800">
                      ₱{Number(res.Amount).toLocaleString()}
                    </td>

                    <td className="py-3 px-4 text-center">
                      <div className="inline-flex items-center gap-2">
                        <span
                          className={`h-3 w-3 rounded-full ${
                            res.Status === "pending"
                              ? "bg-yellow-400"
                              : res.Status === "confirmed"
                              ? "bg-blue-500"
                              : res.Status === "completed"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        ></span>
                        <select
                          value={res.Status}
                          onChange={(e) =>
                            handleStatusChange(res.ReservationID, e.target.value)
                          }
                          className="border border-gray-300 rounded-md text-sm px-2 py-1 focus:ring-2 focus:ring-indigo-400 outline-none"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleDelete(res.ReservationID)}
                        className="bg-red-100 hover:bg-red-200 text-red-600 font-semibold px-3 py-1.5 rounded-md text-sm transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="py-6 px-4 text-center text-gray-500 italic"
                  >
                    No reservations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdDash;
