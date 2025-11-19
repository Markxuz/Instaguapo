const express = require("express");
const router = express.Router();
const formalWearController = require("../controllers/formalWearController");
const uploadFormalWear = require("../middlewares/uploadFormalWear");

router.get("/", formalWearController.getFormalWear);
router.post("/", uploadFormalWear.single("ImageURL"), formalWearController.addFormalWear);
router.put("/:id", uploadFormalWear.single("ImageURL"), formalWearController.updateFormalWear);
router.delete("/:id", formalWearController.deleteFormalWear);

module.exports = router;
