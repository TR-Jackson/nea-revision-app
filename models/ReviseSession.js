import mongoose from 'mongoose'

import handleError from '../middleware/db'

// ReviseSession data model
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

// Returns the ReviseSession data model object which is used to perform actions on the ReviseSessions collection
// It creates the model if it doesn't exist yet then returns it and just returns it if it does already exist
export default mongoose.models.ReviseSession ||
  mongoose.model('ReviseSession', reviseSessionSchema)
