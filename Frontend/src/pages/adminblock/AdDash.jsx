import { useEffect, useState } from "react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import {
  getReservations,
  updateReservationStatus,
  deleteReservation,
} from "../../api/AdminresApi";

const AdDash = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    try {
      const data = await getReservations();
      setReservations(data);
    } catch (err) {
      console.error(err);
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

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <AdminNavbar />
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Recent Reservation</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border">Customer</th>
                <th className="py-2 px-4 border">Date of Reservation</th>
                <th className="py-2 px-4 border">Event Date</th>
                <th className="py-2 px-4 border">Wear</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((res) => (
                <tr key={res.ReservationID}>
                  <td className="py-2 px-4 border">{res.Customer}</td>
                  <td className="py-2 px-4 border">
                    {new Date(res.ReservationDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border">
                    {new Date(res.EventDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border">{res.WearName}</td>
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
