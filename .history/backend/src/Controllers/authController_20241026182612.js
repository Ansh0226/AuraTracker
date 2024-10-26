// authController.js
import UserAuth from "../models/Auth.js"; // Ensure this path is correct
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";

dotenv.config();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuth = async (req, res) => {
  const { idToken } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { sub: googleId, email, name, picture } = ticket.getPayload();

    let user = await UserAuth.findOne({ googleId });
    if (!user) {
      user = await UserAuth.create({
        googleId,
        email,
        name,
        profilePicture: picture,
      });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Invalid Token" });
  }
};
