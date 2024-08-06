const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const authMiddleware = require("../middleware/authMiddleware");

// Protect routes with authentication middleware
router.get("/items", authMiddleware, itemController.getItems);
router.post("/items", authMiddleware, itemController.addItem);

module.exports = router;
