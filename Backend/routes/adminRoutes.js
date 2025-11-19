const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const verifyToken = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");

router.post("/signup", adminController.signup);
router.post("/verify", adminController.verifyAdmin);
router.post("/login", adminController.loginAdmin);

// Only logged-in admins can create new admins
router.post("/create-admin", verifyToken, adminController.createAdminByAdmin);
router.post("/forgot-password", adminController.forgotPassword);
router.post("/reset-password", adminController.resetPassword);


router.get("/profile", verifyToken, adminController.getAdminProfile);
router.put("/profile", verifyToken, upload.single("ProfilePhoto"), adminController.updateProfile);

router.delete("/delete", verifyToken, adminController.deleteAdmin);

module.exports = router;
