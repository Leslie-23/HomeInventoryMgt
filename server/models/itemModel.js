const mongoose = require("mongoose");

// Define the item schema
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
});

// Export the Item model
module.exports = mongoose.model("Item", itemSchema);
