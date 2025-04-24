const express = require("express");
const router = express.Router();
const {signup, loginUser, verifyUser} = require("../controllers/userController");

router.post("/signup", signup);
router.post("/login", loginUser);
router.post("/verify", verifyUser);

module.exports = router;
