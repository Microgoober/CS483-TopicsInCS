// File: config/passport.js
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";

/**
 * Configure the Google OAuth2 strategy for Passport middleware.
 * This tells Passport how to handle authentication with Google.
 */
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Try to find an existing user in the database by their Google ID
        let user = await User.findOne({ googleId: profile.id });

        // If the user doesn't exist, create a new one
        if (!user) {
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            picture: profile.photos[0].value,
          });
        }

        // Pass the user object to Passport (authentication successful)
        done(null, user);
      } catch (err) {
        // Pass the error to Passport (authentication failed)
        done(err, null);
      }
    }
  )
);

/**
 * Serialize user into the session.
 * Stores the user's ID in the session cookie.
 */
passport.serializeUser((user, done) => {
  done(null, user.id);
});

/**
 * Deserialize user from the session.
 * Runs on every authenticated request to fetch the full user object.
 */
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;