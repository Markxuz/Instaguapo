const express = require("express");
const router = express.Router();
const favoritesController = require("../controllers/favoritesController");
const authMiddleware = require("../middlewares/authMiddleware");

// GET all favorites of the logged-in user
router.get("/", authMiddleware, favoritesController.getFavorites);

// ADD a favorite
router.post("/", authMiddleware, favoritesController.addFavorite);

// REMOVE a favorite
router.delete("/:id", authMiddleware, favoritesController.removeFavorite);

module.exports = router;
