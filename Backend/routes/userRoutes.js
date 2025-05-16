const express = require("express");
const router = express.Router();
const { signup, loginUser, verifyUser, forgotPassword, resetPassword } = require("../controllers/userController");

router.post("/signup", signup);
router.post("/login", loginUser);
router.post("/verify", verifyUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
