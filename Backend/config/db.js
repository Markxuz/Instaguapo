const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,       
  user: process.env.DB_USER,       // MySQL username
  password: process.env.DB_PASSWORD,   // MySQL password
  database: process.env.DB_NAME,   // database name
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to MySQL database");
});

module.exports = db;
