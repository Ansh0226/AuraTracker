const express = require("express");
const passport = require("passport");

const router = express.Router();

// Start Google authentication
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google callback route
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/profile",
    failureRedirect: "/auth/login",
  })
);

// Route for logged-in users to view profile
router.get("/profile", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/auth/login");
  }
  res.send(`Hello, ${req.user.name}. Email: ${req.user.email}`);
});

// Route to log out
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
