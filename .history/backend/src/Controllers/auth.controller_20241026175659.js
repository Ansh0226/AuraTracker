const UserAuth = require("../models/Auth");
const { OAuth2Client } = require("google-auth-library");
const dotenv = require("dotenv");

dotenv.config();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleAuth = async (req, res) => {
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

module.exports = { googleAuth };
