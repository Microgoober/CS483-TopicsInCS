import express from "express";
import {
  createEntry,
  getAllEntries,
  getEntryById,
  updateEntry,
  deleteEntry,
} from "../controllers/diaryController.js";
import { validateDiaryEntry, validateDiaryUpdate } from "../middleware/validation.js";
import { ensureAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

// All diary routes require authentication
router.get("/", ensureAuthenticated, getAllEntries);
router.post("/", ensureAuthenticated, validateDiaryEntry, createEntry);
router.get("/:id", ensureAuthenticated, getEntryById);
router.put("/:id", ensureAuthenticated, validateDiaryUpdate, updateEntry);
router.delete("/:id", ensureAuthenticated, deleteEntry);

export default router;