/**
 * @file server.js
 * @description Main entry point for the ThoughtStream API.
 * Initializes Express, connects to MongoDB, sets up middleware,
 * and defines API routes.
 */
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import connectDB from "./config/db.js";
import diaryRoutes from "./routes/diaryRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// Import Passport configuration
import "./config/Passport.js";

// Load environment variables from .env into process.env
dotenv.config();

// Initialize an Express application
const app = express();

// Establish a connection to the MongoDB database
connectDB();

// Middleware setup
app.use(express.json());
app.use(cors({
  origin: true,
  credentials: true,
}));

// Cookie parser middleware (required by express-session)
app.use(cookieParser());

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true if using HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Initialize Passport and restore authentication state from session
app.use(passport.initialize());
app.use(passport.session());

// Define API routes
app.use("/api/diary", diaryRoutes);
app.use("/auth", authRoutes);

// Default route to check if the server is running
app.get("/", (req, res) => {
  res.send("Welcome to ThoughtStream API");
});

// Define the server port
const PORT = process.env.PORT || 5000;

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});