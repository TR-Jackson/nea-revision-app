import mongoose from "mongoose";

const folderSchema = new mongoose.Schema({
  owner: { type: mongoose.ObjectId, required: true },
  name: { type: String, required: true },
  lastReview: { type: Date, default: new Date(0) },
  boxStatus: { type: [Number], default: [0, 0, 0, 0, 0] }, // [number of cards in box 0, cards in box 1, etc]
  isPrivate: { type: Boolean, default: true },
  description: { type: String, default: "" },
});

export default mongoose.models.Folder || mongoose.model("Folder", folderSchema);
