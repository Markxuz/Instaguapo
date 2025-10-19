import db from "../config/db.js";

export const getReservations = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT r.ReservationID, u.FullName AS Customer, r.ReservationDate, r.EventDate,
             r.Status, r.Notes, r.created_at, r.updated_at,
             f.Name AS WearName, a.AdminName
      FROM Reservation r
      JOIN User u ON r.UserID = u.UserID
      JOIN FormalWear f ON r.WearID = f.WearID
      LEFT JOIN Admin a ON r.AdminID = a.AdminID
      ORDER BY r.created_at DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addReservation = async (req, res) => {
  const { UserID, WearID, AdminID, ReservationDate, EventDate, Notes } = req.body;
  try {
    await db.query(
      "INSERT INTO Reservation (UserID, WearID, AdminID, ReservationDate, EventDate, Notes) VALUES (?, ?, ?, ?, ?, ?)",
      [UserID, WearID, AdminID, ReservationDate, EventDate, Notes]
    );
    res.json({ message: "Reservation added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateReservationStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    await db.query(
      "UPDATE Reservation SET Status=? WHERE ReservationID=?",
      [status, id]
    );
    res.json({ message: "Reservation status updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteReservation = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM Reservation WHERE ReservationID=?", [id]);
    res.json({ message: "Reservation deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
