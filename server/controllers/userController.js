const User = require("../models/userModel");

// Create or update user details
exports.createOrUpdateUser = async (req, res) => {
  const { uid, email, displayName } = req.body;

  try {
    // Find user by Firebase UID and update their details, or create a new user if not found
    let user = await User.findOneAndUpdate(
      { uid },
      { email, displayName },
      { new: true, upsert: true }
    );

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
