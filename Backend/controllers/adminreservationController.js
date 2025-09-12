import {
  getAllReservations,
  createReservation,
  updateReservationStatus,
  deleteReservation,
} from "../models/adminreservationModel.js";


export const getReservations = (req, res) => {
  getAllReservations((err, results) => {
    if (err) {
      console.error("Error fetching reservations:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
};


export const addReservation = (req, res) => {
  createReservation(req.body, (err, result) => {
    if (err) {
      console.error("Error creating reservation:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(201).json({ message: "Reservation created", id: result.insertId });
  });
};


export const changeReservationStatus = (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  updateReservationStatus(id, status, (err, result) => {
    if (err) {
      console.error("Error updating reservation:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "Status updated" });
  });
};


export const removeReservation = (req, res) => {
  const { id } = req.params;

  deleteReservation(id, (err, result) => {
    if (err) {
      console.error("Error deleting reservation:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "Reservation deleted" });
  });
};
