/**
 * @file server.js
 * @description Main entry point for the ThoughtStream API.
 * Initializes Express, connects to MongoDB, sets up middleware,
 * and defines API routes.
 */
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import diaryRoutes from "./routes/diaryRoutes.js";

// Load environment variables from .env into process.env
dotenv.config();

// Initialize an Express application
const app = express();

// Establish a connection to the MongoDB database
connectDB();

// Middleware setup
app.use(express.json());
app.use(cors());

// Define API routes
app.use("/api/diary", diaryRoutes);

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