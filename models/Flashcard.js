import mongoose from "mongoose";

const flashcardSchema = new mongoose.Schema({
  front: { type: String, required: true },
  back: { type: String, required: true },
  folder: { type: String, required: true },
  owner: { type: mongoose.ObjectId, required: true },
  nextReview: { type: Date, required: true },
});

export default mongoose.models.Flashcard ||
  mongoose.model("Flashcard", flashcardSchema);
