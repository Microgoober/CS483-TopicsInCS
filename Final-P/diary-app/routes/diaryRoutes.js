// File: routes/diaryRoutes.js
import express from "express";
import {
  createEntry,
  getAllEntries,
  getEntryById,
  updateEntry,
  deleteEntry,
} from "../controllers/diaryController.js";
import { validateDiaryEntry, validateDiaryUpdate } from "../middleware/validation.js";
import { authenticateJWT } from "../middleware/authMiddleware.js";

const router = express.Router();

// All diary routes require JWT authentication
router.get("/", authenticateJWT, getAllEntries);
router.post("/", authenticateJWT, validateDiaryEntry, createEntry);
router.get("/:id", authenticateJWT, getEntryById);
router.put("/:id", authenticateJWT, validateDiaryUpdate, updateEntry);
router.delete("/:id", authenticateJWT, deleteEntry);

export default router;