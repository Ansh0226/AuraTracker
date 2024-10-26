const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const Auth = require("../models/Auth");

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
