const db = require("../config/db");

// ADD FAVORITE
exports.addFavorite = (req, res) => {
  const { wearID } = req.body; // WearID from FormalWear table
  const userID = req.user.id;

  if (!wearID) {
    return res.status(400).json({ message: "wearID is required" });
  }

  const sql = `
    INSERT INTO favorite (UserID, WearID)
    VALUES (?, ?)
  `;

  db.query(sql, [userID, wearID], (err) => {
    if (err) {
      console.error("SQL error:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, message: "Added to favorites" });
  });
};

// REMOVE FAVORITE
exports.removeFavorite = (req, res) => {
  const wearID = req.params.id;
  const userID = req.user.id;

  if (!wearID || isNaN(wearID)) {
    return res.status(400).json({ message: "Invalid wearID" });
  }

  const sql = `
    DELETE FROM favorite
    WHERE UserID = ? AND WearID = ?
  `;

  db.query(sql, [userID, wearID], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, message: "Removed from favorites" });
  });
};

// GET ALL FAVORITES OF USER
exports.getFavorites = (req, res) => {
  if (!req.user) return res.status(401).json({ message: "User not authenticated" });

  const userID = req.user.id;

  const sql = `
    SELECT fw.*, f.WearID AS FavoriteWearID, f.FavoriteID
    FROM favorite f
    JOIN formalwear fw ON f.WearID = fw.WearID
    WHERE f.UserID = ?
  `;

  db.query(sql, [userID], (err, results) => {
    if (err) {
      console.error("SQL error:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};
