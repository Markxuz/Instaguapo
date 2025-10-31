// sa admin pang get ng reservatiobns
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

// pang update ng status ng reservation (confirmed, cancelled, completed)
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

// delete yun na yon
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

// pang get ng total reservations for dashboard
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

// kukunin neto ang yearly total reservations yearly for dashboard of reservations
export async function getYearlyTotalReservations() {
  const response = await fetch("http://localhost:5000/api/admin/reservations/total/year", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch yearly total reservations.");
  }

  return data.total;
}

// Get reservations by selected year
export async function getReservationsByYear(year) {
  const response = await fetch(`http://localhost:5000/api/admin/reservations/year/${year}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch reservations by year.");
  }

  return data;
}
