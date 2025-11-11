// adminCalendarApi.js

// Get all calendar events
export async function getAllEvents() {
  const response = await fetch("http://localhost:5000/api/admin/calendar", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch calendar events.");
  }

  return data;
}

// Add a new calendar event
export async function addEvent(eventData) {
  const response = await fetch("http://localhost:5000/api/admin/calendar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to add calendar event.");
  }

  return data;
}

// Delete a calendar event by ID
export async function deleteEvent(id) {
  const response = await fetch(`http://localhost:5000/api/admin/calendar/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete calendar event.");
  }

  return data;
}
