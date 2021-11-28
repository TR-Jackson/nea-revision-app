import mongoose from "mongoose";

import handleError from "../middleware/db";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.post("save", handleError);
userSchema.post("find", handleError);
userSchema.post("findOne", handleError);
userSchema.post("deleteOne", handleError);
userSchema.post("deleteMany", handleError);

export default mongoose.models.User || mongoose.model("User", userSchema);
