// File: routes/authRoutes.js
import express from "express";
import passport from "passport";

const router = express.Router();

/**
 * @route GET /auth/google
 * @desc Initiates the OAuth2 login flow by redirecting the user to Google's consent screen
 */
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

/**
 * @route GET /auth/google/callback
 * @desc Handles the OAuth2 callback from Google after the user logs in and consents
 */
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/failure",
  }),
  (req, res) => {
    // Success! Send a success response
    res.status(200).json({
      message: "Login successful! Session has been created.",
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        picture: req.user.picture,
      },
    });
  }
);

/**
 * @route GET /auth/logout
 * @desc Logs the user out by ending the session and clearing session cookies
 */
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ message: "Error during logout" });
    }
    // Destroy the session
    req.session.destroy((sessionErr) => {
      if (sessionErr) {
        console.error("Session destruction error:", sessionErr);
        return res.status(500).json({ message: "Error destroying session" });
      }
      res.clearCookie("connect.sid");
      res.status(200).json({ message: "Logout successful" });
    });
  });
});

/**
 * @route GET /auth/failure
 * @desc A simple error handler route for failed logins
 */
router.get("/failure", (req, res) => {
  res.status(401).json({ message: "Login failed. Please try again." });
});

/**
 * @route GET /auth/current-user
 * @desc Returns the currently authenticated user (for testing)
 */
router.get("/current-user", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({
      authenticated: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        picture: req.user.picture,
      },
    });
  } else {
    res.status(200).json({ authenticated: false, user: null });
  }
});

export default router;