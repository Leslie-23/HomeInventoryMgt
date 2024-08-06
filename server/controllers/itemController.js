const Item = require("../models/itemModel");
const User = require("../models/userModel");

// Get all items for a specific user
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find({ userId: req.user._id });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new item for a specific user
exports.addItem = async (req, res) => {
  const { name, category, imageUrl } = req.body;

  // Create a new item with the user's ID
  const item = new Item({ name, category, imageUrl, userId: req.user._id });

  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
