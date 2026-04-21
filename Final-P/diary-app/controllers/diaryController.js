// File: controllers/diaryController.js
import DiaryEntry from "../models/DiaryEntry.js";
import { fetchWeather } from "./weatherController.js";

/**
 * @route GET /api/diary
 * @desc Fetch all diary entries for the authenticated user
 * @access Private (requires JWT)
 */
export const getAllEntries = async (req, res) => {
  try {
    const { search, tag, location } = req.query;
    
    // Use req.user.userId from JWT (not req.user._id from session)
    let filter = { user: req.user.userId };

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }

    if (tag) {
      filter.tags = tag;
    }

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    const entries = await DiaryEntry.find(filter).sort({ createdAt: -1 });
    res.status(200).json(entries);
  } catch (error) {
    console.error("Error fetching entries:", error);
    res.status(500).json({ message: "Server Error: Unable to fetch diary entries" });
  }
};

/**
 * @route GET /api/diary/:id
 * @desc Fetch a specific diary entry by ID
 */
export const getEntryById = async (req, res) => {
  try {
    const entry = await DiaryEntry.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({ message: "Diary entry not found" });
    }

    // Check ownership using req.user.userId
    if (entry.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Forbidden: You don't own this entry" });
    }

    res.status(200).json(entry);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Diary entry not found" });
    }
    console.error("Error fetching entry:", error);
    res.status(500).json({ message: "Server Error: Unable to fetch diary entry" });
  }
};

/**
 * @route POST /api/diary
 * @desc Create a new diary entry
 */
export const createEntry = async (req, res) => {
  try {
    const { title, content, reflection, tags, location } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    if (!content || !content.trim()) {
      return res.status(400).json({ message: "Content is required" });
    }

    if (!location || !location.trim()) {
      return res.status(400).json({ message: "Location is required" });
    }

    const weatherData = location ? await fetchWeather(location) : null;

    const newEntry = new DiaryEntry({
      user: req.user.userId, // Use userId from JWT
      title: title.trim(),
      content: content.trim(),
      reflection: reflection ? reflection.trim() : "",
      tags: tags || [],
      location: location.trim(),
      weather: weatherData,
    });

    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    console.error("Error creating entry:", error);
    res.status(400).json({ message: error.message });
  }
};

/**
 * @route PUT /api/diary/:id
 * @desc Update an existing diary entry
 */
export const updateEntry = async (req, res) => {
  try {
    const { title, content, reflection, tags, location } = req.body;
    const entryId = req.params.id;

    const existingEntry = await DiaryEntry.findById(entryId);

    if (!existingEntry) {
      return res.status(404).json({ message: "Diary entry not found" });
    }

    // Check ownership using req.user.userId
    if (existingEntry.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Forbidden: You don't own this entry" });
    }

    const updateData = {};

    if (title !== undefined) updateData.title = title.trim();
    if (content !== undefined) updateData.content = content.trim();
    if (reflection !== undefined) updateData.reflection = reflection.trim() || "";
    if (tags !== undefined) updateData.tags = tags;

    if (location !== undefined && location.trim()) {
      updateData.location = location.trim();
      updateData.weather = await fetchWeather(location.trim());
    }

    const updatedEntry = await DiaryEntry.findByIdAndUpdate(
      entryId,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedEntry);
  } catch (error) {
    console.error("Error updating entry:", error);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Diary entry not found" });
    }
    res.status(400).json({ message: error.message });
  }
};

/**
 * @route DELETE /api/diary/:id
 * @desc Delete a diary entry
 */
export const deleteEntry = async (req, res) => {
  try {
    const entry = await DiaryEntry.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({ message: "Diary entry not found" });
    }

    // Check ownership using req.user.userId
    if (entry.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Forbidden: You don't own this entry" });
    }

    await DiaryEntry.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Diary entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting entry:", error);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Diary entry not found" });
    }
    res.status(500).json({ message: "Server Error: Unable to delete diary entry" });
  }
};