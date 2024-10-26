// server.js
import dotenv from "dotenv"; // Use import syntax for dotenv
import express from "express"; // Use import syntax for express
import { dbConnection } from "./src/Database/dbConnection.js"; // Import dbConnection function
import cors from "cors"; // Import CORS middleware
import authRoutes from "./src/routes/auth.js"; // Import authentication routes
import passport from "passport"; // Import Passport
import session from "express-session"; // Import session middleware
import { Strategy as GoogleStrategy } from "passport-google-oauth20"; // Import Google Strategy
import Auth from "./src/models/Auth.js"; // Import your user model

dotenv.config(); // Load environment variables

const app = express(); // Initialize express app

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Session setup (this is necessary for passport to work)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_session_secret", // Secret for signing the session ID cookie
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize()); // Initialize Passport
app.use(passport.session()); // Use sessions for Passport

// Connect to the database
dbConnection(); // Call the dbConnection function to connect to MongoDB

// Passport Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Find or create user
        let user = await Auth.findOne({ googleId: profile.id });

        if (!user) {
          // Create a new user if one does not exist
          user = new Auth({
            googleId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
            profilePicture: profile.photos[0].value,
            accessToken,
            refreshToken,
          });
          await user.save();
        } else {
          // Update tokens for an existing user
          user.accessToken = accessToken;
          user.refreshToken = refreshToken;
          await user.save();
        }

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

// Serialize and deserialize user
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await Auth.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Example route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Authentication routes
app.use("/auth", authRoutes); // Use auth routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
