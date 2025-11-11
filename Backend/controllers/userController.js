const User = require("../models/userModel");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { sendVerificationEmail, sendPasswordResetEmail } = require("../utils/mailer");
const jwt = require("jsonwebtoken");

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

        try {
          await sendVerificationEmail(email, VerificationCode);

          const token = jwt.sign(
            { id: result.insertId, email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );

          res.status(200).json({
            message: "Please verify your account using the code sent to your email!",
            token,
          });
        } catch (emailErr) {
          console.error(emailErr);
          return res
            .status(500)
            .json({ message: "Error sending verification email", emailErr });
        }
      }
    );
  } catch (err) {
    res.status(500).json({ message: "Error hashing password", err });
  }
};

const verifyUser = (req, res) => {
  const { email, code } = req.body;

  User.findUserByEmail(email, (err, results) => {
    if (err || results.length === 0)
      return res.status(400).json({ message: "User not found" });

    const user = results[0];

    console.log("Expected code:", user.VerificationCode);
    console.log("Entered code:", code);

    if (String(user.VerificationCode) !== String(code).padStart(6, "0")) {
      return res.status(400).json({ message: "Invalid verification code" });
    }

    User.markAsVerified(email, (err) => {
      if (err)
        return res.status(500).json({ message: "Error verifying account" });

      res
        .status(200)
        .json({ message: "Account verified and registered successfully" });
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
      return res
        .status(401)
        .json({ message: "Please verify your account first." });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.Password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.UserID, email: user.Email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
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
        return res
          .status(500)
          .json({ message: "Failed to send email", emailErr });
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

    if (
      user.resetCode !== code ||
      new Date(user.resetTokenExpiry) < new Date()
    ) {
      return res.status(400).json({ message: "Invalid or expired code" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    User.updatePassword(email, hashedPassword, (err) => {
      if (err)
        return res.status(500).json({ message: "Error updating password" });

      res.status(200).json({ message: "Password updated successfully" });
    });
  });
};

const deleteUser = (req, res) => {
  const userId = req.user.id;

  User.deleteUserById(userId, (err, result) => {
    if (err)
      return res.status(500).json({ message: "Error deleting account" });

    res.status(200).json({ message: "Account deleted successfully" });
  });
};

const getUserProfile = (req, res) => {
  const userId = req.user.id;
  User.findUserById(userId, (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(results[0]);
  });
};


const updateProfilePic = (req, res) => {
  const UserID = req.user.id;
  const { Fullname, Email, PhoneNumber } = req.body;
  let ProfilePicPath = null;

  // If a file was uploaded, save its path
  if (req.file) {
    ProfilePicPath = `uploads/${req.file.filename}`;
  }

  // SQL for update
  const sql = ProfilePicPath
    ? `
        UPDATE User
        SET Fullname = ?, Email = ?, PhoneNumber = ?, ProfilePic = ?, updated_at = NOW()
        WHERE UserID = ?
      `
    : `
        UPDATE User
        SET Fullname = ?, Email = ?, PhoneNumber = ?, updated_at = NOW()
        WHERE AdminID = ?
      `;

  const params = ProfilePicPath
    ? [Fullname, Email, PhoneNumber, ProfilePicPath, UserID]
    : [Fullname, Email, PhoneNumber, UserID];

  db.query(sql, params, (err) => {
    if (err) {
      console.error("Error updating profile:", err);
      return res.status(500).json({ message: "Server error updating profile" });
    }

    // Fetch the updated record and send back full data
    const fetchSql = `
      SELECT UserID, Fullname, Email, PhoneNumber, ProfilePic
      FROM User
      WHERE UserID = ?
    `;

    db.query(fetchSql, [UserID], (err, results) => {
      if (err || results.length === 0) {
        return res.status(500).json({ message: "Error fetching updated profile" });
      }

      const updatedUser = results[0];
      // ✅ Include full URL for image preview in frontend
      const imageUrl = updatedUser.ProfilePic
        ? `http://localhost:5000/${updatedUser.ProfilePic}`
        : null;

      res.status(200).json({
        message: "Profile updated successfully",
        admin: { ...updatedUser, ProfilePic: imageUrl },
      });
    });
  });
};

module.exports = {
  signup,
  verifyUser,
  loginUser,
  forgotPassword,
  resetPassword,
  deleteUser,
  getUserProfile,
  updateProfilePic,
};
