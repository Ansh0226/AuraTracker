// server.js
import dotenv from "dotenv"; // Use import syntax for dotenv
import express from "express"; // Use import syntax for express
import mongoose from "mongoose"; // Use import syntax for mongoose
import {dbConnection}   from "./src/Database/dbConnection.js"

dotenv.config(); // Load environment variables

const app = express(); // Initialize express app

// Import database connection
dbConnection();

// Example route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
