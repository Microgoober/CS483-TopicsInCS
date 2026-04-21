// File: routes/authRoutes.js
import express from "express";
import { handleGoogleLogin } from "../controllers/authController.js";

const router = express.Router();

/**
 * @route POST /api/auth/google
 * @desc Verifies Google ID token and returns app JWT
 * @access Public
 */
router.post("/google", handleGoogleLogin);

/**
 * @route POST /api/auth/logout
 * @desc Logout (client-side only - just returns success)
 * @access Public
 */
router.post("/logout", (req, res) => {
  res.status(200).json({ message: "Logout successful" });
});

export default router;