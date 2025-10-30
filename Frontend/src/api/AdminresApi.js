// ✅ GET all reservations for admin
export async function getReservations() {
  const response = await fetch("http://localhost:5000/api/admin/reservations", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch reservations.");
  }

  return data;
}

// ✅ UPDATE reservation status (confirm, cancel, complete)
export async function updateReservationStatus({ id, status }) {
  const response = await fetch(`http://localhost:5000/api/admin/reservations/${id}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update reservation status.");
  }

  return data;
}

// ✅ DELETE reservation
export async function deleteReservation(id) {
  const response = await fetch(`http://localhost:5000/api/admin/reservations/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete reservation.");
  }

  return data;
}

export async function getMonthlyTotalReservations() {
  const response = await fetch("http://localhost:5000/api/admin/reservations/total/month", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch monthly total reservations.");
  }

  return data.total;
}