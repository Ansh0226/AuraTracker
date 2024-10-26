// server.js
import dotenv from "dotenv"; // Use import syntax for dotenv
import express from "express"; // Use import syntax for express
import mongoose from "mongoose"; // Use import syntax for mongoose
import dbConn

dotenv.config(); // Load environment variables

const app = express();

// MongoDB connection URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
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
