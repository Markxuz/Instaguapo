// controllers/userController.js
const User = require("../models/userModel");

const signup = (req, res) => {
  const { fullname, email, password, phonenumber } = req.body;

  User.createUser({ fullname, email, password, phonenumber }, (err, result) => {
    if (err) return res.status(500).json({ message: "Database error", err });
    res.status(201).json({ message: "User registered successfully" });
  });
};
const loginUser = (req, res) => {
  const { email, password } = req.body;

  User.findUserByEmail(email, (err, results) => {
    if (err || results.length === 0)
      return res.status(401).json({ message: "Invalid credentials" });

    const user = results[0];

    console.log("Entered password:", password);
    console.log("Stored password:", user.Password);

    if (user.Password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user });
  });
};

module.exports = {
  signup,
  loginUser,
};
