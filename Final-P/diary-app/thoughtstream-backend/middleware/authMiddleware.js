// File: middleware/authMiddleware.js
import jwt from "jsonwebtoken";

/**
 * Middleware to verify JWT token from Authorization header
 * Expected header format: "Bearer <token>"
 * On success, attaches req.user = { userId, name, email }
 */
export const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token missing or malformed" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach user info to request object
    req.user = {
      userId: decoded.userId,
      name: decoded.name,
      email: decoded.email,
    };
    
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired. Please login again." });
    }
    
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};