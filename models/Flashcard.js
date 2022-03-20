import mongoose from 'mongoose'

import handleError from '../middleware/db'

// Flashcard data model
const flashcardSchema = new mongoose.Schema({
  front: { type: String, required: true },
  back: { type: String, required: true },
  folder: { type: mongoose.ObjectId, required: true },
  owner: { type: mongoose.ObjectId, required: true },
  nextReview: { type: Date, default: new Date(0) },
  notStudied: { type: Boolean, default: true },
  n: { type: Number, default: 0 },
  EF: { type: Number, default: 2.5 },
  reviewedToday: { type: Boolean, default: false }
})

flashcardSchema.post('save', handleError)
flashcardSchema.post('find', handleError)
flashcardSchema.post('findOne', handleError)
flashcardSchema.post('deleteOne', handleError)
flashcardSchema.post('deleteMany', handleError)

// Returns the flashcard data model object which is used to perform actions on the flashcards collection
// It creates the model if it doesn't exist yet then returns it and just returns it if it does already exist
export default mongoose.models.Flashcard ||
  mongoose.model('Flashcard', flashcardSchema)
