import db from "../config/db.js";

export const getAllReservations = (callback) => {
  const query = `
    SELECT r.ReservationID, u.FullName AS Customer, r.ReservationDate, r.EventDate,
           r.Status, r.Notes, r.created_at, r.updated_at,
           f.Name AS WearName, a.AdminName
    FROM Reservation r
    JOIN User u ON r.UserID = u.UserID
    JOIN FormalWear f ON r.WearID = f.WearID
    LEFT JOIN Admin a ON r.AdminID = a.AdminID
    ORDER BY r.created_at DESC
  `;
  db.query(query, callback);
};


export const createReservation = (data, callback) => {
  const { UserID, WearID, AdminID, ReservationDate, EventDate, Notes } = data;
  const query = `
    INSERT INTO Reservation (UserID, WearID, AdminID, ReservationDate, EventDate, Notes)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [UserID, WearID, AdminID, ReservationDate, EventDate, Notes], callback);
};


export const updateReservationStatus = (id, status, callback) => {
  const query = `UPDATE Reservation SET Status = ? WHERE ReservationID = ?`;
  db.query(query, [status, id], callback);
};

export const deleteReservation = (id, callback) => {
  const query = `DELETE FROM Reservation WHERE ReservationID = ?`;
  db.query(query, [id], callback);
};
