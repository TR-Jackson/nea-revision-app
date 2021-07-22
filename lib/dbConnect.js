import mongoose from "mongoose";

export default async function dbConnect() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  return mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
}
