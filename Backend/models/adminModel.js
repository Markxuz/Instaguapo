const db = require("../config/db");

const findByUsername = (username, callback) => {
  const sql = "SELECT * FROM Admin WHERE Username = ?";
  db.query(sql, [username], callback);
};

module.exports = {
  findByUsername,
};