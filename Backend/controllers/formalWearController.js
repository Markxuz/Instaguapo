const db = require("../config/db"); // ✅ callback-based db

// Get all formal wear
exports.getFormalWear = (req, res) => {
  db.query("SELECT * FROM FormalWear ORDER BY created_at DESC", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Add formal wear
exports.addFormalWear = (req, res) => {
  const { Name, Category, Size, Price } = req.body;
  const ImageURL = req.file ? `/uploads/${req.file.filename}` : null;

  db.query(
    "INSERT INTO FormalWear (Name, Category, Size, Price, ImageURL) VALUES (?, ?, ?, ?, ?)",
    [Name, Category, Size, Price, ImageURL],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "FormalWear added successfully", id: result.insertId });
    }
  );
};

// Update formal wear
exports.updateFormalWear = (req, res) => {
  const { id } = req.params;
  const { Name, Category, Size, Price } = req.body;
  const ImageURL = req.file ? `/uploads/${req.file.filename}` : req.body.ImageURL;

  db.query(
    "UPDATE FormalWear SET Name=?, Category=?, Size=?, Price=?, ImageURL=? WHERE WearID=?",
    [Name, Category, Size, Price, ImageURL, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "FormalWear updated successfully" });
    }
  );
};

// Delete formal wear
exports.deleteFormalWear = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM FormalWear WHERE WearID=?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "FormalWear deleted successfully" });
  });
};
