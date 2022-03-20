import mongoose from 'mongoose'

// Function initialises (if not already initialised) a database connection and returns it
export default async function dbConnect () {
  if (mongoose.connection.readyState >= 1) {
    return
  }

  return mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
    user: process.env.DB_USERNAME,
    pass: process.env.DB_PASSWORD
  })
}
