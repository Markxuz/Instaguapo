const db = require("../db"); // adjust according to your db setup

const getCollectionItems = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM FormalWear"); // your table name
    res.json(rows);
  } catch (err) {
    console.error("Error fetching admin items:", err);
    res.status(500).json({ message: "Failed to fetch collection items." });
  }
};

module.exports = { getCollectionItems };
