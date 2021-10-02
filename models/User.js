import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  // folders: { type: [Object], required: true }, // {name, last reviewed, [cards in box 0, cards in box 1, etc]}
});

export default mongoose.models.User || mongoose.model("User", userSchema);
