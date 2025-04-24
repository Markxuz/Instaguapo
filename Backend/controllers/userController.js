const User = require("../models/userModel");
const crypto = require("crypto");

const signup = (req, res) => {
  const { fullname, email, password, phonenumber, } = req.body;
  const VerificationCode = crypto.randomInt(100000, 1000000).toString(); //this will generate 6 digit codes

  User.createUser({ fullname, email, password, phonenumber, VerificationCode }, (err, result) => {
    if (err) return res.status(500).json({ message: "Database error", err });
    console.log("Verification code:", VerificationCode);


    res.status(200).json({ message: "Please verify your account using the code sent to your email!" });
  });
};
const verifyUser = (req, res) => {
  const { email, code} = req.body;

  User.findUserByEmail(email, (err, results) => {
    if (err || results.length === 0)
      return res.status(400).json({ message: "User not found" });

    const user = results[0];

    if (user.VerificationCode !== code.toString) {
      return res.status(400).json({ message: "Invalid verification code" });
    }

    User.markUserAsVerified(email, (err) => {
      if (err) return res.status(500).json({ message: "Error verifying account" });

    res.status(200).json({ message: "Account verified and registered succesfully" });
    });
  });
};
const loginUser = (req, res) => {
  const { email, password } = req.body;

  User.findUserByEmail(email, (err, results) => {
    if (err || results.length === 0)
      return res.status(401).json({ message: "Invalid credentials" });

    const user = results[0];

    if (!user.IsVerified) {
      return res.status(401).json({ message:"Please verify your account first." });
    }

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
  verifyUser,
  loginUser,
};
