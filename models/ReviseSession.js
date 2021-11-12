import mongoose from "mongoose";

const reviseSessionSchema = new mongoose.Schema({
  folder: { type: mongoose.ObjectId, required: true },
  toReview: { type: [mongoose.ObjectId], default: [] }, // [flashcardIDs]
});

export default mongoose.models.ReviseSession ||
  mongoose.model("ReviseSession", reviseSessionSchema);
