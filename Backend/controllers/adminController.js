const Admin = require("../models/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginAdmin = (req, res) => {
  const { username, password } = req.body;

  Admin.findByUsername(username, async (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const admin = results[0];
    const isMatch = await bcrypt.compare(password, admin.Password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin.AdminID, username: admin.Username, role: admin.Role },
      "Secret",
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Admin login successful", token, admin });
  });
};

module.exports = {
  loginAdmin,
};
