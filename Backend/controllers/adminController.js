const Admin = require("../models/adminModel");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { sendVerificationEmail, sendPasswordResetEmail } = require("../utils/mailer");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

// ======================= SIGNUP =======================
const signup = async (req, res) => {
  const { Fullname, Email, PhoneNumber, Password, RoleID } = req.body;
  const VerificationCode = crypto.randomInt(100000, 1000000).toString();

  if (!Fullname || !Email || !PhoneNumber || !Password) {
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

// ======================= VERIFY ADMIN =======================
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

// ======================= LOGIN =======================
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

    res.status(200).json({
      message: "Login successful",
      token,
      admin: {
        AdminID: admin.AdminID,
        Fullname: admin.Fullname,
        Email: admin.Email,
        PhoneNumber: admin.PhoneNumber,
        RoleID: admin.RoleID,
        ProfilePhoto: admin.ProfilePhoto || null,
      },
    });
  });
};

// ======================= GET ADMIN PROFILE =======================
const getAdminProfile = (req, res) => {
  const adminId = req.user.id;

  const sql = `
    SELECT AdminID, Fullname, Email, PhoneNumber, RoleID, ProfilePhoto, created_at, updated_at
    FROM Admin
    WHERE AdminID = ?
  `;

  db.query(sql, [adminId], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error", err });
    if (results.length === 0) return res.status(404).json({ message: "Admin not found" });

    res.status(200).json({ admin: results[0] });
  });
};

// ======================= FORGOT PASSWORD =======================
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

// ======================= RESET PASSWORD =======================
const resetPassword = async (req, res) => {
  const { Email, code, newPassword } = req.body;

  Admin.findAdminByEmail(Email, async (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const admin = results[0];

    if (admin.resetCode !== code || new Date(admin.resetCodeExpiry) < new Date()) {
      return res.status(400).json({ message: "Invalid or expired code" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    Admin.updatePassword(Email, hashedPassword, (err) => {
      if (err) return res.status(500).json({ message: "Error updating password" });

      res.status(200).json({ message: "Password updated successfully" });
    });
  });
};

// ======================= DELETE ADMIN =======================
const deleteAdmin = (req, res) => {
  const adminId = req.user.id;

  Admin.deleteAdminById(adminId, (err, result) => {
    if (err) return res.status(500).json({ message: "Error deleting account" });

    res.status(200).json({ message: "Admin account deleted successfully" });
  });
};


// ======================= UPDATE PROFILE =======================
const updateProfile = (req, res) => {
  const adminId = req.user.id;
  const { Fullname, Email, PhoneNumber } = req.body;
  let profilePhotoPath = null;

  // If a file was uploaded, save its path
  if (req.file) {
    profilePhotoPath = `uploads/${req.file.filename}`;
  }

  // SQL for update
  const sql = profilePhotoPath
    ? `
        UPDATE Admin
        SET Fullname = ?, Email = ?, PhoneNumber = ?, ProfilePhoto = ?, updated_at = NOW()
        WHERE AdminID = ?
      `
    : `
        UPDATE Admin
        SET Fullname = ?, Email = ?, PhoneNumber = ?, updated_at = NOW()
        WHERE AdminID = ?
      `;

  const params = profilePhotoPath
    ? [Fullname, Email, PhoneNumber, profilePhotoPath, adminId]
    : [Fullname, Email, PhoneNumber, adminId];

  db.query(sql, params, (err) => {
    if (err) {
      console.error("Error updating profile:", err);
      return res.status(500).json({ message: "Server error updating profile" });
    }

    // Fetch the updated record and send back full data
    const fetchSql = `
      SELECT AdminID, Fullname, Email, PhoneNumber, ProfilePhoto
      FROM Admin
      WHERE AdminID = ?
    `;

    db.query(fetchSql, [adminId], (err, results) => {
      if (err || results.length === 0) {
        return res.status(500).json({ message: "Error fetching updated profile" });
      }

      const updatedAdmin = results[0];
      // ✅ Include full URL for image preview in frontend
      const imageUrl = updatedAdmin.ProfilePhoto
        ? `http://localhost:5000/${updatedAdmin.ProfilePhoto}`
        : null;

      res.status(200).json({
        message: "Profile updated successfully",
        admin: { ...updatedAdmin, ProfilePhoto: imageUrl },
      });
    });
  });
};
const createAdminByAdmin = async (req, res) => {
  const requester = req.user; // comes from verifyToken middleware

  // 1. Only admins can create new admins
  if (requester.role !== 1) {
    return res.status(403).json({ message: "Access denied" });
  }

  const { Fullname, Email, PhoneNumber, Password } = req.body;

  if (!Fullname || !Email || !PhoneNumber || !Password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(Password, 10);
    const VerificationCode = crypto.randomInt(100000, 1000000).toString();

    Admin.createAdmin(
      { Fullname, Email, PhoneNumber, Password: hashedPassword, RoleID: 1, VerificationCode },
      async (err, result) => {
        if (err) return res.status(500).json({ message: "Database error", err });

        // Send verification email to new admin
        try {
          await sendVerificationEmail(Email, VerificationCode);
          res.status(200).json({
            message: "New admin created successfully. Verification email sent.",
          });
        } catch (emailErr) {
          console.error(emailErr);
          return res.status(500).json({ message: "Error sending email", emailErr });
        }
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  signup,
  verifyAdmin,
  loginAdmin,
  getAdminProfile,
  forgotPassword,
  resetPassword,
  deleteAdmin,
  updateProfile,
  createAdminByAdmin,
};
