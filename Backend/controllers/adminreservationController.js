import db from "../config/db.js";

// ✅ Get all reservations (Customer + Formal Wear + Admin)
export const getReservations = (req, res) => {
  const query = `
    SELECT 
    r.ReservationID, 
    u.FullName AS Customer, 
    r.ReservationDate, 
    r.EventDate,
    r.ReturnDate,
    r.Amount,
    r.Status, 
    r.Notes,
    r.created_at, 
    r.updated_at,
    f.Name AS WearName, 
    a.FullName AS AdminName
  FROM Reservation r
  JOIN User u ON r.UserID = u.UserID
  JOIN FormalWear f ON r.WearID = f.WearID
  LEFT JOIN Admin a ON r.AdminID = a.AdminID
  ORDER BY r.created_at DESC

  `;

  db.query(query, (err, rows) => {
    if (err) {
      console.error("Error fetching reservations:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

// ✅ Add a new reservation (Admin can add manually)
export const addReservation = (req, res) => {
  const { UserID, WearID, AdminID, ReservationDate, EventDate, ReturnDate, Amount, Notes } = req.body;

  const query = `
    INSERT INTO Reservation 
    (UserID, WearID, AdminID, ReservationDate, EventDate, ReturnDate, Amount, Notes, Status) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending')
  `;

  db.query(
    query,
    [UserID, WearID, AdminID, ReservationDate, EventDate, ReturnDate || null, Amount || 0, Notes || null],
    (err, result) => {
      if (err) {
        console.error("Error adding reservation:", err);
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Reservation added successfully" });
    }
  );
};

// ✅ Update reservation status (Confirm / Cancel / Complete)
export const updateReservationStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const query = `UPDATE Reservation SET Status = ? WHERE ReservationID = ?`;

  db.query(query, [status, id], (err, result) => {
    if (err) {
      console.error("Error updating reservation status:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Reservation status updated successfully" });
  });
};

// ✅ Delete a reservation
export const deleteReservation = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM Reservation WHERE ReservationID = ?", [id], (err, result) => {
    if (err) {
      console.error("Error deleting reservation:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Reservation deleted successfully" });
  });
};

export const getTotalReservationsThisMonth = (req, res) => {
  const query = `
    SELECT COUNT(*) AS total 
    FROM Reservation
    WHERE MONTH(ReservationDate) = MONTH(CURRENT_DATE())
    AND YEAR(ReservationDate) = YEAR(CURRENT_DATE());
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching total reservations for this month:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ total: result[0].total });
  });
};
