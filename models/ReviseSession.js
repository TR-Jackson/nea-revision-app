import mongoose from "mongoose";

const reviseSessionSchema = new mongoose.Schema({
  lastReview: { type: Date, required: true },
  toReview: { type: [mongoose.ObjectId], required: true }, // [flashcardIDs]
});

export default mongoose.model("ReviseSession", reviseSessionSchema);
