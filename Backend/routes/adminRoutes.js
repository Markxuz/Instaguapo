const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.post("/signup", adminController.signup);
router.post("/verify", adminController.verifyAdmin);
router.post("/login", adminController.loginAdmin);
router.post("/forgot-password", adminController.forgotPassword);
router.post("/reset-password", adminController.resetPassword);

module.exports = router;
