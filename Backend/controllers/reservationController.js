const db = require("../config/db");

// Get all reservations
exports.getAllReservations = (req, res) => {
  const query = `
    SELECT r.*, 
           u.FullName AS UserName, 
           f.Name AS FormalWearName,
           f.ImageURL AS FormalWearImage
    FROM Reservation r
    LEFT JOIN User u ON r.UserID = u.UserID
    LEFT JOIN FormalWear f ON r.WearID = f.WearID
    ORDER BY r.created_at DESC
  `;

  db.query(query, (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error fetching reservations", error: err });
    res.status(200).json(results);
  });
};

// Create new reservation
exports.createReservation = (req, res) => {
  const { UserID, WearID, AdminID, ReservationDate, EventDate, Notes } = req.body;

  // Default values
  const status = "pending";
  const admin = AdminID || null;
  const notes = Notes || null; // can store GCash reference number

  const query = `
    INSERT INTO Reservation 
    (UserID, WearID, AdminID, ReservationDate, EventDate, Status, Notes)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [UserID, WearID, admin, ReservationDate, EventDate, status, notes],
    (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Error creating reservation", error: err });

      res.status(201).json({
        message: "Reservation created successfully",
        reservationID: result.insertId,
      });
    }
  );
};

// Update reservation
exports.updateReservation = (req, res) => {
  const { id } = req.params;
  const { Status, Notes } = req.body;

  db.query(
    "UPDATE Reservation SET Status = ?, Notes = ? WHERE ReservationID = ?",
    [Status, Notes, id],
    (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Error updating reservation", error: err });
      res.status(200).json({ message: "Reservation updated successfully" });
    }
  );
};

exports.getBookedDates = (req, res) => {
  const { wearID } = req.params;
  const query = `
    SELECT ReservationDate, EventDate AS ReturnDate
    FROM Reservation
    WHERE WearID = ? AND Status IN ('pending', 'confirmed')
  `;
  db.query(query, [wearID], (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching booked dates", error: err });
    res.status(200).json(results);
  });
};

// Delete reservation
exports.deleteReservation = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM Reservation WHERE ReservationID = ?",
    [id],
    (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Error deleting reservation", error: err });
      res.status(200).json({ message: "Reservation deleted successfully" });
    }
  );
};
