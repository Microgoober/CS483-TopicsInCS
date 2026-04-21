/**
 * @file server.js
 * @description Main entry point for the ThoughtStream API with JWT authentication.
 */
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import diaryRoutes from "./routes/diaryRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// Load environment variables
dotenv.config();

// Initialize Express application
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// CORS configuration for React frontend
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/diary", diaryRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to ThoughtStream API with JWT Authentication");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});