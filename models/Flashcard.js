import mongoose from "mongoose";

const flashcardSchema = new mongoose.Schema({
  front: { type: String, required: true },
  back: { type: String, required: true },
  folder: { type: mongoose.ObjectId, required: true },
  owner: { type: mongoose.ObjectId, required: true },
  nextReview: { type: Date, default: new Date(0) },
  notStudied: { type: Boolean, default: true },
  box: { type: Number, default: 0 },
});

export default mongoose.models.Flashcard ||
  mongoose.model("Flashcard", flashcardSchema);
