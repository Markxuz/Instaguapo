const db = require("../config/db");

// Get all calendar events
exports.getAllEvents = (req, res) => {
  const sql = "SELECT * FROM Calendar";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("DB error in getAllEvents:", err);
      return res.status(500).json({ message: "DB error fetching events", error: err.message });
    }
    res.json(results);
  });
};

// Add new unavailable date
exports.addEvent = (req, res) => {
  console.log("adminCalendarController.addEvent - incoming body:", req.body);

  const { AdminID, Title, Description, EventDate } = req.body;

  // Basic validation
  if (!EventDate) {
    console.warn("Validation failed - EventDate missing");
    return res.status(400).json({ message: "EventDate is required" });
  }

  const adminIdValue = AdminID ? AdminID : null;

  const sql = `INSERT INTO Calendar (AdminID, Title, Description, EventDate) VALUES (?, ?, ?, ?)`;

  db.query(sql, [adminIdValue, Title, Description, EventDate], (err, result) => {
    if (err) {
      console.error("DB error inserting event:", err);
      // Return the DB error message to the frontend for debugging
      return res.status(500).json({ message: "Failed to add event", error: err.message });
    }

    return res.status(200).json({ message: "Event added successfully", CalendarID: result.insertId });
  });
};

// Delete event by ID
exports.deleteEvent = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM Calendar WHERE CalendarID = ?";
  db.query(sql, [id], (err) => {
    if (err) {
      console.error("DB error deleting event:", err);
      return res.status(500).json({ message: "Failed to delete event", error: err.message });
    }
    res.json({ message: "Event deleted successfully" });
  });
};
