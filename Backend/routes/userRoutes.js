const express = require("express");
const router = express.Router();
const { signup, loginUser, verifyUser, forgotPassword, resetPassword } = require("../controllers/userController");
const { deleteUser } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");


router.delete("/delete", authMiddleware, deleteUser);
router.post("/signup", signup);
router.post("/login", loginUser);
router.post("/verify", verifyUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
