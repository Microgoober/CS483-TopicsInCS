import mongoose from "mongoose";

const diarySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Changed to true for Part 2 - each entry must belong to a user
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    reflection: {
      type: String,
      trim: true,
      maxlength: [500, "Reflection cannot exceed 500 characters"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    tags: {
      type: [String],
      default: [],
    },
    weather: {
      condition: { type: String },
      temperature: { type: Number },
      location: { type: String },
    },
  },
  { timestamps: true }
);

const DiaryEntry = mongoose.model("DiaryEntry", diarySchema);
export default DiaryEntry;