const Admin = require("../models/adminModel");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { sendVerificationEmail, sendPasswordResetEmail } = require("../utils/mailer");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { Fullname, Email,  PhoneNumber, Password, RoleID } = req.body;
  const VerificationCode = crypto.randomInt(100000, 1000000).toString();

  if (!Fullname || !Email || !PhoneNumber || !Password ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(Password, 10);

    Admin.createAdmin(
      {
        Fullname,
        Email,
        PhoneNumber,
        Password: hashedPassword,
        RoleID,
        VerificationCode,
      },
      async (err, result) => {
        if (err) return res.status(500).json({ message: "Database error", err });

        console.log("Admin verification code:", VerificationCode);

        try {
          await sendVerificationEmail(Email, VerificationCode);

          const token = jwt.sign(
            { id: result.insertId, email: Email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );

          res.status(200).json({
            message: "Please verify your admin account using the code sent to your email!",
            token,
          });
        } catch (emailErr) {
          console.error(emailErr);
          return res.status(500).json({ message: "Error sending verification email", emailErr });
        }
      }
    );
  } catch (err) {
    console.error("Hashing error:", err);
    res.status(500).json({ message: "Error hashing password", err });
  }
};

const verifyAdmin = (req, res) => {
  const { Email, VerificationCode } = req.body;

  Admin.findAdminByEmail(Email, (err, results) => {
    if (err || results.length === 0)
      return res.status(400).json({ message: "Admin not found" });

    const admin = results[0];

    if (String(admin.VerificationCode) !== String(VerificationCode).padStart(6, "0")) {
      return res.status(400).json({ message: "Invalid verification code" });
    }

    Admin.markAsVerified(Email, (err) => {
      if (err) return res.status(500).json({ message: "Error verifying account" });

      res.status(200).json({ message: "Admin account verified successfully" });
    });
  });
};

const loginAdmin = async (req, res) => {
  const { Email, Password } = req.body;

  Admin.findAdminByEmail(Email, async (err, results) => {
    if (err || results.length === 0)
      return res.status(401).json({ message: "Invalid credentials" });

    const admin = results[0];

    if (!admin.IsVerified) {
      return res.status(401).json({ message: "Please verify your account first." });
    }

    const isPasswordMatch = await bcrypt.compare(Password, admin.Password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin.AdminID, email: admin.Email, role: admin.RoleID },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token, admin });
  });
};

const forgotPassword = async (req, res) => {
  const { Email } = req.body;

  Admin.findAdminByEmail(Email, async (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ message: "Email not found" });
    }

    const resetCode = crypto.randomInt(100000, 1000000).toString();
    const resetCodeExpiry = new Date(Date.now() + 15 * 60 * 1000);

    Admin.saveResetCode(Email, resetCode, resetCodeExpiry, (err) => {
      if (err) return res.status(500).json({ message: "Database error" });

      try {
        sendPasswordResetEmail(Email, resetCode);
        res.status(200).json({ message: "Password reset code sent to email" });
      } catch (emailErr) {
        return res.status(500).json({ message: "Failed to send email", emailErr });
      }
    });
  });
};

const resetPassword = async (req, res) => {
  const { Email, code, newPassword } = req.body;

  Admin.findAdminByEmail(Email, async (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const admin = results[0];

    if (
      admin.resetCode !== code ||
      new Date(admin.resetCodeExpiry) < new Date()
    ) {
      return res.status(400).json({ message: "Invalid or expired code" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    Admin.updatePassword(Email, hashedPassword, (err) => {
      if (err) return res.status(500).json({ message: "Error updating password" });

      res.status(200).json({ message: "Password updated successfully" });
    });
  });
};

const deleteAdmin = (req, res) => {
  const adminId = req.user.id;

  Admin.deleteAdminById(adminId, (err, result) => {
    if (err) return res.status(500).json({ message: "Error deleting account" });

    res.status(200).json({ message: "Admin account deleted successfully" });
  });
};

module.exports = {
  signup,
  verifyAdmin,
  loginAdmin,
  forgotPassword,
  resetPassword,
  deleteAdmin,
};
