import express from "express";
import {
  getReservations,
  addReservation,
  changeReservationStatus,
  removeReservation,
} from "../controllers/adminreservationController.js";

const router = express.Router();

router.get("/", getReservations);
router.post("/", addReservation);
router.put("/:id/status", changeReservationStatus);
router.delete("/:id", removeReservation);

export default router;
