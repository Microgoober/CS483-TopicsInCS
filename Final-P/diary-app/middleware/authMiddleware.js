// File: middleware/authMiddleware.js

/**
 * Middleware to check if a user is authenticated.
 * Uses Passport's req.isAuthenticated() method which checks:
 * - Whether the user has an active session
 * - Whether req.user has been set by Passport
 */
export const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized: Please log in first" });
};

/**
 * Middleware to check ownership of a diary entry.
 * This should be used after ensureAuthenticated.
 * @param {Object} entry - The diary entry to check ownership for
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const checkOwnership = (entry, req, res) => {
  if (!entry) {
    return false;
  }
  // Compare the user ID from the entry with the logged-in user's ID
  if (entry.user.toString() !== req.user._id.toString()) {
    return false;
  }
  return true;
};