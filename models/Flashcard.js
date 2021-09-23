import mongoose from "mongoose";

const flashcardSchema = new mongoose.Schema({
  front: { type: String, required: true },
  back: { type: String, required: true },
  folder: { type: String, required: true },
  owner: { type: String, required: true },
  nextReview: { type: Date, required: true },
  notStudied: { type: Boolean, required: true },
});

export default mongoose.models.Flashcard ||
  mongoose.model("Flashcard", flashcardSchema);
