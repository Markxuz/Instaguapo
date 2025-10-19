const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");

router.get("/", reservationController.getAllReservations);
router.post("/", reservationController.createReservation);
router.put("/:id", reservationController.updateReservation);
router.get("/booked/:wearID", reservationController.getBookedDates);
router.delete("/:id", reservationController.deleteReservation);

module.exports = router;
