const express = require("express");
const router = express.Router();
const {
  signup,
  loginUser,
  verifyUser,
  forgotPassword,
  resetPassword,
  deleteUser,
  getUserProfile,
  updateProfilePic,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");


// Auth-related routes
router.post("/signup", signup);
router.post("/login", loginUser);
router.post("/verify", verifyUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Profile routes
router.get("/profile", authMiddleware, getUserProfile);
router.put("/profile", authMiddleware, upload.single("ProfilePic"), updateProfilePic);

// Delete account
router.delete("/delete", authMiddleware, deleteUser);

module.exports = router;
