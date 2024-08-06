const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true }, // Firebase user ID
  email: { type: String, required: true, unique: true }, // User email
  displayName: { type: String }, // User display name
});

// Export the User model
module.exports = mongoose.model("User", userSchema);
