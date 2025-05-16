const User = require("../models/userModel");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { sendVerificationEmail } = require("../utils/mailer");
const jwt= require("jsonwebtoken");


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
  
  try {
    // 1. Check if user exists
    User.findUserByEmail(email, async (err, results) => {
      if (err || results.length === 0) {
        return res.status(404).json({ message: "Email not found" });
      }

      // 2. Generate reset token (expires in 1 hour)
      const resetToken = crypto.randomBytes(20).toString('hex');
      const resetTokenExpiry = Date.now() + 3600000; // 1 hour

      // 3. Save token to DB
      User.updateResetToken(email, resetToken, resetTokenExpiry, (err) => {
        if (err) return res.status(500).json({ message: "Database error" });

        // 4. Send email with reset link
        const resetLink = `http://yourfrontend.com/reset-password?token=${resetToken}`;
        sendPasswordResetEmail(email, resetLink); // You'll need to implement this in mailer.js
        
        res.status(200).json({ message: "Password reset link sent to email" });
      });
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // 1. Find user by token and check expiry
    User.findByResetToken(token, (err, user) => {
      if (err || !user || new Date(user.resetTokenExpiry) < new Date()) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }

      // 2. Hash new password
      bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ message: "Error hashing password" });

        // 3. Update password and clear token
        User.updatePassword(user.email, hashedPassword, (err) => {
          if (err) return res.status(500).json({ message: "Database error" });
          res.status(200).json({ message: "Password updated successfully" });
        });
      });
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  signup,
  verifyUser,
  loginUser,
  forgotPassword,
  resetPassword,
};
