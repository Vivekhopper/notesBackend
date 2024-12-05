import express from "express";
import Note from "../models/Note.js";
import middleware from "../middleware/middleware.js";

const router = express.Router();

router.post("/add", middleware, async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    const newNote = new Note({
      title,
      description,
      userId: req.user.id,
    });

    await newNote.save();
    return res
      .status(200)
      .json({ success: true, message: "Note added successfully" });
  } catch (err) {
    console.error("Error in adding note:", err);
    return res
      .status(500)
      .json({ success: false, message: "Error in adding note" });
  }
});

router.get("/note", middleware, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch notes" });
  }
});

router.put("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updateNote = await Note.findByIdAndUpdate(id, req.body, { new: true });

    if (!updateNote) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    return res.json({ success: true, updateNote, message: "Note updated successfully" });
  } catch (err) {
    console.error("Error in updating note:", err);
    return res.status(500).json({ success: false, message: "Error in updating note" });
  }
});
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    return res.json({ success: true, message: "Note deleted successfully" });
  } catch (err) {
    console.error("Error in deleting note:", err);
    return res.status(500).json({ success: false, message: "Error in deleting note" });
  }
});


export default router;
