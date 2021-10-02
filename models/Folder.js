import mongoose from "mongoose";

const folderSchema = new mongoose.Schema({
  owner: { type: String, required: true },
  name: { type: String, required: true },
  lastReview: { type: Date, default: new Date() },
  status: { type: [Number], default: [0, 0, 0, 0, 0] }, // {name, last reviewed, [cards in box 0, cards in box 1, etc]}
  isPrivate: { type: Boolean, default: true },
});

export default mongoose.models.Folder || mongoose.model("Folder", folderSchema);
