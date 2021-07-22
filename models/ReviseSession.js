import mongoose from "mongoose";

const flashcardSchema = new mongoose.Schema({
  lastReview: { type: Date, required: true },
  toReview: { type: [mongoose.ObjectId], required: true }, // [flashcardIDs]
});

export default moongose.model("Flashcard", flashcardSchema);
