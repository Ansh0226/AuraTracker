// src/routes/auth.js
import express from "express";
import { OAuth2Client } from "google-auth-library";

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Route to handle Google authentication
router.post("/google", async (req, res) => {
  const { idToken } = req.body;

  try {
    // Verify the token using Google API
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    });

    const payload = ticket.getPayload();

    // Here you can find or create the user in your database
    // Example: const user = await findOrCreateUser(payload);

    // Respond with user data or any relevant information
    res.json({ success: true, user: payload });
  } catch (error) {
    console.error("Error verifying Google token:", error);
    res.status(401).json({ error: "Invalid token" });
  }
});

// Route for logged-in users to view profile
router.get("/profile", (req, res) => {
  // You would need to implement session management or token verification
  if (!req.user) {
    return res.redirect("/auth/login");
  }
  res.send(`Hello, ${req.user.name}. Email: ${req.user.email}`);
});

// Route to log out (implement your logout logic)
router.get("/logout", (req, res) => {
  // Implement logout logic
  res.redirect("/");
});

export default router;
