// src/routes/auth.js
import express from 'express';
import passport from 'passport';

const router = express.Router();

// Google authentication route
router.post('/google', passport.authenticate('google', { session: false }), (req, res) => {
    res.json({ user: req.user }); // Send the user data back to the client
});

export default router;
