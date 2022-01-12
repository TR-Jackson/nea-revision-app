import mongoose from 'mongoose'

import handleError from '../middleware/db'

const reviseSessionSchema = new mongoose.Schema({
  folder: { type: mongoose.ObjectId, required: true },
  toReview: { type: [mongoose.ObjectId], default: [] }, // [flashcardIDs]
  dateAdded: { type: Date, default: new Date(0) }
})

reviseSessionSchema.post('save', handleError)
reviseSessionSchema.post('find', handleError)
reviseSessionSchema.post('findOne', handleError)
reviseSessionSchema.post('deleteOne', handleError)
reviseSessionSchema.post('deleteMany', handleError)

export default mongoose.models.ReviseSession ||
  mongoose.model('ReviseSession', reviseSessionSchema)
