import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { getAllEvents, addEvent, deleteEvent } from "../../api/adminCalendarApi";

function AdminCalendar() {
  const [events, setEvents] = useState([]);

  // Load events when the page opens
  useEffect(() => {
    loadEvents();
  }, []);

  // Fetch all events from database
  const loadEvents = async () => {
    try {
      const data = await getAllEvents();
      const formatted = data.map((event) => ({
        id: event.CalendarID,
        title: event.Title || "Unavailable",
        start: event.EventDate,
        allDay: true,
        backgroundColor: "#f87171",
        borderColor: "#f87171",
      }));
      setEvents(formatted);
    } catch (error) {
      console.error("Error loading events:", error);
    }
  };

  // Handle date click — add unavailable date
  const handleDateClick = async (info) => {
    const confirmed = window.confirm(`Mark ${info.dateStr} as unavailable?`);
    if (!confirmed) return;

    const newEvent = {
      AdminID: 14, // Replace with real AdminID from auth later
      Title: "Unavailable",
      Description: "Store closed",
      EventDate: info.dateStr,
    };

    try {
      const data = await addEvent(newEvent);
      setEvents((prevEvents) => [
        ...prevEvents,
        {
          id: data.CalendarID,
          title: "Unavailable",
          start: info.dateStr,
          allDay: true,
          backgroundColor: "#f87171",
          borderColor: "#f87171",
        },
      ]);
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  // Handle event click — delete unavailable date
  const handleEventClick = async (info) => {
    const confirmed = window.confirm(
      `Remove this unavailable date: ${info.event.startStr}?`
    );
    if (!confirmed) return;

    try {
      await deleteEvent(info.event.id);
      info.event.remove();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <AdminNavbar />
      <div className="flex-1 p-4 mt-16">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-4">
          <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            events={events.map((event) => ({
              ...event,
              display: "background", // this makes the event fill the whole day cell
              backgroundColor: "#f87171", // red background
              borderColor: "#f87171",
            }))}
            height="80vh"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,dayGridWeek",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminCalendar;
