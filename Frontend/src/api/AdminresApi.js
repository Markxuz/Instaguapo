
export async function getReservations() {
  const response = await fetch("http://localhost:5000/api/reservations", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch reservations.");
  }

  return data;
}


export async function updateReservationStatus({ id, status }) {
  const response = await fetch(`http://localhost:5000/api/reservations/${id}/status`, {
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


export async function deleteReservation(id) {
  const response = await fetch(`http://localhost:5000/api/reservations/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete reservation.");
  }

  return data;
}
