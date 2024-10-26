// src/Database/dbConnection.js
import mongoose from "mongoose"; // Use import syntax for mongoose

// Function to connect to MongoDB
export const dbConnection = () => {
  // MongoDB connection URI from environment variables
  const MONGODB_URI = process.env.MONGODB_URI;

  // Connect to MongoDB
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });
};
