/**
 * Validation middleware for diary entries
 * Extra credit feature as mentioned on Page 6 of PDF
 */

/**
 * Validate diary entry on POST request
 */
export const validateDiaryEntry = (req, res, next) => {
  const { title, content, location, reflection } = req.body;
  const errors = [];

  // Required field validation
  if (!title || title.trim() === "") {
    errors.push("Title is required");
  } else if (title.length > 100) {
    errors.push("Title cannot exceed 100 characters");
  }

  if (!content || content.trim() === "") {
    errors.push("Content is required");
  }

  if (!location || location.trim() === "") {
    errors.push("Location is required");
  }

  // Optional field validation
  if (reflection && reflection.length > 500) {
    errors.push("Reflection cannot exceed 500 characters");
  }

  if (errors.length > 0) {
    return res.status(400).json({ 
      message: "Validation failed",
      errors: errors 
    });
  }

  next();
};

/**
 * Validate diary entry on PUT request (partial validation)
 */
export const validateDiaryUpdate = (req, res, next) => {
  const { title, content, location, reflection } = req.body;
  const errors = [];

  if (title !== undefined && title.trim() === "") {
    errors.push("Title cannot be empty");
  } else if (title && title.length > 100) {
    errors.push("Title cannot exceed 100 characters");
  }

  if (content !== undefined && content.trim() === "") {
    errors.push("Content cannot be empty");
  }

  if (location !== undefined && location.trim() === "") {
    errors.push("Location cannot be empty");
  }

  if (reflection && reflection.length > 500) {
    errors.push("Reflection cannot exceed 500 characters");
  }

  if (errors.length > 0) {
    return res.status(400).json({ 
      message: "Validation failed",
      errors: errors 
    });
  }

  next();
};