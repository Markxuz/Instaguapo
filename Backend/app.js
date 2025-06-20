const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/api/users", require("./routes/userRoutes"));   // for users
app.use("/api/admins", require("./routes/adminRoutes")); // for admins


const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

module.exports = app;
