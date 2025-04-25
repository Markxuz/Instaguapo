const User = require("../models/userModel");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  const { fullname, email, password, phonenumber } = req.body;
  const VerificationCode = crypto.randomInt(100000, 1000000).toString(); // generate 6-digit code

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // hash the password

    User.createUser(
      {
        fullname,
        email,
        password: hashedPassword, // store the hashed password
        phonenumber,
        VerificationCode,
      },
      (err, result) => {
        if (err) return res.status(500).json({ message: "Database error", err });

        console.log("Verification code:", VerificationCode);
        res.status(200).json({ message: "Please verify your account using the code sent to your email!" });
      }
    );
  } catch (err) {
    res.status(500).json({ message: "Error hashing password", err });
  }
};
const verifyUser = (req, res) => {
  const { email, code} = req.body;

  User.findUserByEmail(email, (err, results) => {
    if (err || results.length === 0)
      return res.status(400).json({ message: "User not found" });

    const user = results[0];

    console.log("Expected code:", user.VerificationCode);
    console.log("Entered code:", code);

    if (user.VerificationCode !== code.toString()) {
      return res.status(400).json({ message: "Invalid verification code" });
    }

    User.markAsVerified(email, (err) => {
      if (err) return res.status(500).json({ message: "Error verifying account" });

    res.status(200).json({ message: "Account verified and registered succesfully" });
    });
  });
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  User.findUserByEmail(email, async (err, results) => {
    if (err || results.length === 0)
      return res.status(401).json({ message: "Invalid credentials" });

    const user = results[0];

    if (!user.IsVerified) {
      return res.status(401).json({ message: "Please verify your account first." });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.Password);
    if (!isPasswordMatch) {
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
