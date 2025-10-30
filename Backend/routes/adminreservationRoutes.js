const express = require("express");
const router = express.Router();
const adminReservationController = require("../controllers/adminreservationController");

router.get("/", adminReservationController.getReservations);
router.post("/", adminReservationController.addReservation);
router.put("/:id/status", adminReservationController.updateReservationStatus);
router.delete("/:id", adminReservationController.deleteReservation);
router.get("/total/month", adminReservationController.getTotalReservationsThisMonth);

module.exports = router;
