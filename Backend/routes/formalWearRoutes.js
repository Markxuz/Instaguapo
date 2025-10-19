const express = require("express");
const router = express.Router();
const formalWearController = require("../controllers/formalWearController");
const upload = require("../middlewares/upload");

router.get("/", formalWearController.getFormalWear);
router.post("/", upload.single("ImageURL"), formalWearController.addFormalWear); 
router.put("/:id", upload.single("ImageURL"), formalWearController.updateFormalWear);
router.delete("/:id", formalWearController.deleteFormalWear);

module.exports = router;
