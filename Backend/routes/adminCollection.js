
const express = require("express");
const router = express.Router();
const { getCollectionItems } = require("../controllers/adminCollectionController");


router.get("/items", getCollectionItems);

module.exports = router;
