import { useEffect, useState } from "react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { getYearlyTotalReservations, getReservationsByYear } from "../../api/AdminresApi";

const AdminReservation = () => {
  const [totalYearly, setTotalYearly] = useState(0);
  const [reservations, setReservations] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchYearlyTotal();
    fetchReservationsByYear(selectedYear);
  }, [selectedYear]);

  const fetchYearlyTotal = async () => {
    try {
      const total = await getYearlyTotalReservations();
      setTotalYearly(total);
    } catch (error) {
      console.error("Error fetching yearly total reservations:", error);
    }
  };

  const fetchReservationsByYear = async (year) => {
    try {
      const data = await getReservationsByYear(year);
      setReservations(data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  const years = [];
  const currentYear = new Date().getFullYear();
  for (let y = currentYear; y >= currentYear - 5; y--) {
    years.push(y);
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <AdminNavbar />
      <h1 className="text-2xl font-bold mb-8 mt-10 text-gray-800 text-center">
        Reservation Overview (Year {selectedYear})
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white border border-gray-400 shadow-md rounded-xl p-6 flex flex-col items-center justify-center hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-600 mb-2">
            Total Reservations This Year
          </h2>
          <p className="text-4xl font-bold">{totalYearly}</p>
        </div>

        <div className="bg-white border border-gray-400 shadow-md rounded-xl p-6 flex flex-col items-center justify-center hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-600 mb-2">Current Year</h2>
          <p className="text-4xl font-bold">{selectedYear}</p>
        </div>

        <div className="bg-white border border-gray-400 shadow-md rounded-xl p-6 flex flex-col items-center justify-center hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-600 mb-2">Pending Requests</h2>
          <p className="text-4xl font-bold">{selectedYear}</p>
        </div>



      </div>
      

      {/* Filter */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Reservation Details</h2>
        <select
          className="border border-gray-400 rounded-lg px-3 py-2"
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-xl border border-gray-300">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gradient-to-r from-slate-500 to-gray-400 text-white text-sm uppercase">
            <tr>
              <th className="py-3 px-4 text-left">Reservation ID</th>
              <th className="py-3 px-4 text-left">Customer</th>
              <th className="py-3 px-4 text-left">Formal Wear</th>
              <th className="py-3 px-4 text-left">Date Reserved</th>
              <th className="py-3 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {reservations.length > 0 ? (
              reservations.map((res) => (
                <tr key={res.ReservationID} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4">{res.ReservationID}</td>
                  <td className="py-3 px-4">{res.Customer}</td>
                  <td className="py-3 px-4">{res.FormalWearName}</td>
                  <td className="py-3 px-4">
                    {new Date(res.ReservationDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        res.Status === "completed"
                          ? "bg-green-100 text-green-700"
                          : res.Status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {res.Status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-5 text-gray-500">
                  No reservations found for {selectedYear}.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReservation;
