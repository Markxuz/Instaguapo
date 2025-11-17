const express = require("express");
const router = express.Router();
const adminSettingsController = require("../controllers/adminSettingsController");
const verifyToken = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");+

// Get current hero image
router.get(
  "/hero-image",

  adminSettingsController.getHeroImage
);

// Upload or update hero image
router.put(
  "/hero-image",
  verifyToken,
  upload.single("HeroImage"),
  adminSettingsController.updateHeroImage
);



module.exports = router;
