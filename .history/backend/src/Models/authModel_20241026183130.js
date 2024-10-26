// authModel.js
import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String },
  profilePicture: { type: String },
  accessToken: { type: String },
  refreshToken: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// Use export default to export the model
const UserAuth = mongoose.model("UserAuth", AuthSchema);
export default UserAuth; // Ensure this line is present
