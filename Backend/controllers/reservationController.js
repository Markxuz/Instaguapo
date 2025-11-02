const db = require("../config/db");

// Get all reservations
exports.getAllReservations = (req, res) => {
  const query = `
    SELECT 
      r.ReservationID,
      r.UserID,
      r.WearID,
      r.ReservationDate,
      r.EventDate,
      r.ReturnDate,
      r.Amount,
      r.Status,
      r.Notes,
      r.created_at,
      r.updated_at,
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
      return res.status(500).json({ message: "Error fetching reservations", error: err });
    res.status(200).json(results);
  });
};

// Get reservations by user
exports.getReservationsByUser = (req, res) => {
  const { userID } = req.params;
  const query = `
    SELECT 
      r.ReservationID,
      r.UserID,
      r.WearID,
      r.ReservationDate,
      r.EventDate,
      r.ReturnDate,
      r.Amount,
      r.Status,
      r.Notes,
      r.created_at,
      r.updated_at,
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
  const { UserID, WearID, ReservationDate, EventDate, ReturnDate, Status, Notes } = req.body;

  if (!UserID || !WearID || !ReservationDate || !EventDate) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  // 🔹 Step 1: Get the Price from FormalWear table
  const priceQuery = "SELECT Price FROM FormalWear WHERE WearID = ?";

  db.query(priceQuery, [WearID], (err, result) => {
    if (err) {
      console.error("Error fetching price:", err);
      return res.status(500).json({ message: "Error fetching price", error: err });
    }

    const wearPrice = result[0]?.Price || 0;

    // 🔹 Step 2: Insert reservation with that price as Amount
    const insertQuery = `
      INSERT INTO Reservation 
      (UserID, WearID, ReservationDate, EventDate, ReturnDate, Amount, Status, Notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      insertQuery,
      [
        UserID,
        WearID,
        ReservationDate,
        EventDate,
        ReturnDate || null,
        wearPrice,
        Status || "pending",
        Notes || null,
      ],
      (err2, result2) => {
        if (err2) {
          console.error("DB Insert Error:", err2);
          return res.status(500).json({ message: "Error creating reservation", error: err2 });
        }
        res.status(201).json({
          message: "Reservation created successfully",
          reservationID: result2.insertId,
        });
      }
    );
  });
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

// ✅ Get booked date ranges (ReservationDate → ReturnDate)
exports.getBookedDates = (req, res) => {
  const { wearID } = req.params;
  const query = `
    SELECT ReservationDate, ReturnDate
    FROM Reservation
    WHERE WearID = ? 
      AND Status IN ('pending', 'confirmed')
      AND ReturnDate IS NOT NULL
  `;

  db.query(query, [wearID], (err, results) => {
    if (err) {
      console.error("Error fetching booked dates:", err);
      return res
        .status(500)
        .json({ message: "Error fetching booked dates", error: err });
    }
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
