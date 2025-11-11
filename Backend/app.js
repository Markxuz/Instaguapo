const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
require("dotenv").config();

app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admins", adminRoutes);

const formalWearRoutes = require("./routes/formalWearRoutes");
app.use("/api/formalwear", formalWearRoutes);

const reservationRoutes = require("./routes/reservationRoutes");
app.use("/api/reservations", reservationRoutes);

const adminReservationRoutes = require("./routes/adminreservationRoutes");
app.use("/api/admin/reservations", adminReservationRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const adminCalendarRoutes = require("./routes/adminCalendarRoutes");
app.use("/api/admin/calendar", adminCalendarRoutes);

module.exports = app;
