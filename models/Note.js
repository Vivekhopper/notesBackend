import mongoose from "mongoose";
const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
});

const Note=mongoose.model("Note",noteSchema)
export default Note;