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

// Pang kuha ng reservations gamit young user ID
exports.getReservationsByUser = (req, res) => {
  const { userID } = req.params;
  const query = `
    SELECT r.*, 
           u.FullName AS UserName, 
           f.Name AS FormalWearName,
           f.ImageURL AS FormalWearImage
    FROM Reservation r
    LEFT JOIN User u ON r.UserID = u.UserID
    LEFT JOIN FormalWear f ON r.WearID = f.WearID
    WHERE r.UserID = ?
    ORDER BY r.created_at DESC
  `;
  db.query(query, [userID], (err, results) => {
    if (err)
      return res.status(500).json({ message: "Error fetching user reservations", error: err });
    res.status(200).json(results);
  });
};

// Create new reservation
exports.createReservation = (req, res) => {
  const { UserID, WearID, ReservationDate, EventDate, Status, Notes } = req.body;

  if (!UserID || !WearID || !ReservationDate || !EventDate) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  const query = `
    INSERT INTO Reservation (UserID, WearID, ReservationDate, EventDate, Status, Notes)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [UserID, WearID, ReservationDate, EventDate, Status || "pending", Notes || null],
    (err, result) => {
      if (err) {
        console.error("DB Insert Error:", err);
        return res.status(500).json({ message: "Error creating reservation", error: err });
      }
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
