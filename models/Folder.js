import mongoose from "mongoose";

import handleError from "../middleware/db";

const folderSchema = new mongoose.Schema({
  owner: { type: mongoose.ObjectId, required: true },
  name: { type: String, required: true },
  lastReview: { type: Date, default: new Date(0) },
  boxStatus: { type: [Number], default: [0, 0, 0, 0, 0] }, // [number of cards in box 0, cards in box 1, etc]
  isPrivate: { type: Boolean, default: true },
  description: { type: String, default: "" },
});

folderSchema.post("save", handleError);
folderSchema.post("find", handleError);
folderSchema.post("findOne", handleError);
folderSchema.post("deleteOne", handleError);
folderSchema.post("deleteMany", handleError);

export default mongoose.models.Folder || mongoose.model("Folder", folderSchema);
