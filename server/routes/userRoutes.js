const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Route to create or update user details
router.post("/users", userController.createOrUpdateUser);

module.exports = router;
