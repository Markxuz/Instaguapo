const User = require("../models/userModel");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { sendVerificationEmail, sendPasswordResetEmail } = require("../utils/mailer");
const jwt= require("jsonwebtoken");


const signup = async (req, res) => {
  const { fullname, email, password, phonenumber } = req.body;
  const VerificationCode = crypto.randomInt(100000, 1000000).toString();

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    User.createUser(
      {
        fullname,
        email,
        password: hashedPassword,
        phonenumber,
        VerificationCode,
      },
      async (err, result) => {
        if (err) return res.status(500).json({ message: "Database error", err });

        console.log("Verification code:", VerificationCode);
        try{
          await sendVerificationEmail(email, VerificationCode);
          res.status(200).json({ message: "Please verify your account using the code sent to your email!" });
        } catch (emailErr) {
          console.error(emailErr);
          return res.status(500).json({ message: "Error sending verification email", emailErr });
        }

        
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

    const token =jwt.sign({ id : user.UserID, email: user.Email},
      "Secret", {expiresIn: "1h"}
    );
    
    res.status(200).json({ message: "Login successful", token, user });
  });

};
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  User.findUserByEmail(email, async (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ message: "Email not found" });
    }

    const resetCode = crypto.randomInt(100000, 1000000).toString();
    const resetCodeExpiry = new Date(Date.now() + 15 * 60 * 1000);

    User.saveResetCode(email, resetCode, resetCodeExpiry, (err) => {
      if (err) return res.status(500).json({ message: "Database error" });

      try {
        sendPasswordResetEmail(email, resetCode);
        res.status(200).json({ message: "Password reset code sent to email" });
      } catch (emailErr) {
        return res.status(500).json({ message: "Failed to send email", emailErr });
      }
    });
  });
};

const resetPassword = async (req, res) => {
  const { email, code, newPassword } = req.body;

  User.findUserByEmail(email, async (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = results[0];

    if (user.resetCode !== code || new Date(user.resetTokenExpiry) < new Date()) {
      return res.status(400).json({ message: "Invalid or expired code" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    User.updatePassword(email, hashedPassword, (err) => {
      if (err) return res.status(500).json({ message: "Error updating password" });

      res.status(200).json({ message: "Password updated successfully" });
    });
  });
};

module.exports = {
  signup,
  verifyUser,
  loginUser,
  forgotPassword,
  resetPassword,
};
