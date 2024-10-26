// server.js
import dotenv from "dotenv"; // Use import syntax for dotenv
import express from "express"; // Use import syntax for express
import { dbConnection } from "./src/Database/dbConnection.js"; // Import dbConnection function

dotenv.config(); // Load environment variables

const app = express(); // Initialize express app

// Connect to the database
dbConnection(); // Call the dbConnection function to connect to MongoDB

// Example route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
