const express = require("express");
const router = express.Router();
const adminCalendarController = require("../controllers/adminCalendarController");

router.get("/", adminCalendarController.getAllEvents);
router.post("/", adminCalendarController.addEvent);
router.delete("/:id", adminCalendarController.deleteEvent);

module.exports = router;
