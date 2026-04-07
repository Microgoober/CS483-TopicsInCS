import express from "express";
import {
  createEntry,
  getAllEntries,
  getEntryById,
  updateEntry,
  deleteEntry,
} from "../controllers/diaryController.js";
import { validateDiaryEntry, validateDiaryUpdate } from "../middleware/validation.js";

const router = express.Router();

// @route GET /api/diary
router.get("/", getAllEntries);

// @route POST /api/diary - With validation middleware (extra credit)
router.post("/", validateDiaryEntry, createEntry);

// @route GET /api/diary/:id
router.get("/:id", getEntryById);

// @route PUT /api/diary/:id - With validation middleware (extra credit)
router.put("/:id", validateDiaryUpdate, updateEntry);

// @route DELETE /api/diary/:id
router.delete("/:id", deleteEntry);

export default router;