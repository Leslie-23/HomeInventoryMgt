const express = require("express");
const mongoose = require("mongoose");
const itemRoutes = require("./routes/itemRoutes");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());

// Use routes for items and users
app.use("/api", itemRoutes);
app.use("/api", userRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error(error));

module.exports = app;
