// ReservationApi.js

// Create Reservation
export async function createReservation({
  UserID,
  WearID,
  ReservationDate,
  EventDate,
  Status,
  Notes,
}) {
  const response = await fetch("http://localhost:5000/api/reservations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      UserID,
      WearID,
      ReservationDate,
      EventDate,
      Status,
      Notes,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Reservation API Error:", data);
    throw new Error(data.message || "Failed to create reservation. Please try again.");
  }

  return data;
}


// Get All Reservations
export async function getReservations() {
  const response = await fetch("http://localhost:5000/api/reservations", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch reservations. Please try again.");
  }

  return data;
}

// Update Reservation
export async function updateReservation({ id, Status, Notes }) {
  const response = await fetch(`http://localhost:5000/api/reservations/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ Status, Notes }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update reservation. Please try again.");
  }

  return data;
}

export async function getBookedDates(wearID) {
  const response = await fetch(`http://localhost:5000/api/reservations/booked/${wearID}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch booked dates.");
  }

  return data;
}


// Delete Reservation
export async function deleteReservation(id) {
  const response = await fetch(`http://localhost:5000/api/reservations/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete reservation. Please try again.");
  }

  return data;
}
