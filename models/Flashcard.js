import mongoose from "mongoose";

const flashcardSchema = new mongoose.Schema({
  front: { type: String, required: true },
  back: { type: String, required: true },
  folder: { type: String, required: true },
  owner: { type: String, required: true },
  nextReview: { type: Date, default: new Date(0) },
  notStudied: { type: Boolean, default: true },
  box: { type: Number, default: 0 },
});

export default mongoose.models.Flashcard ||
  mongoose.model("Flashcard", flashcardSchema);
