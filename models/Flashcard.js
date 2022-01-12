import mongoose from 'mongoose'

import handleError from '../middleware/db'

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

export default mongoose.models.Flashcard ||
  mongoose.model('Flashcard', flashcardSchema)
