const API_URL = "http://localhost:5000/api/reservations";


export async function getReservations() {
  const response = await fetch(API_URL, {
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
  const response = await fetch(`${API_URL}/${id}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update status.");
  }

  return data;
}


export async function deleteReservation(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete reservation.");
  }

  return data;
}
