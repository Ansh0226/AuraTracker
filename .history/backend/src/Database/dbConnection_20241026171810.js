// Load environment variables
// dbConnection.js
require("dotenv").config(); // Make sure to require dotenv to load your .env file

const express = require("express");
const mongoose = require("mongoose");

const app = express();

// MongoDB connection URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose
  .connect(MONGODB_UR)
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server only after successful connection
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Example route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
