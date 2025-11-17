const db = require("../config/db");

// ✅ Upload or update hero image (protected)
exports.updateHeroImage = async (req, res) => {
  try {
    const adminID = req.user.id; // from verifyToken
    const heroImage = req.file ? req.file.filename : null;

    if (!heroImage) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const sql = `UPDATE Admin SET HeroImage = ? WHERE AdminID = ?`;

    db.query(sql, [heroImage, adminID], (err) => {
      if (err) return res.status(500).json({ error: err });

      return res.json({
        message: "Hero image updated successfully",
        heroImage: heroImage,
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get hero image (public)
exports.getHeroImage = async (req, res) => {
  try {
    const sql = `SELECT HeroImage FROM Admin LIMIT 1`; // pick first admin

    db.query(sql, (err, result) => {
      if (err) return res.status(500).json({ error: err });

      if (result.length === 0) return res.json({ heroImage: null });

      return res.json({ heroImage: result[0].HeroImage });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
