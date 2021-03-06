import mongoose from 'mongoose'

import handleError from '../middleware/db'

// Folder data model
const folderSchema = new mongoose.Schema({
  owner: { type: mongoose.ObjectId, required: true },
  name: { type: String, required: true },
  nextReview: { type: Date, default: new Date(0) },
  revisedStatus: { type: [Number], default: [0, 0, 0, 0, 0, 0] }, // [unrevised, n=0, 1, 2-3, 4-7, 8+]
  isPrivate: { type: Boolean, default: true },
  description: { type: String, default: '' }
})

folderSchema.post('save', handleError)
folderSchema.post('find', handleError)
folderSchema.post('findOne', handleError)
folderSchema.post('deleteOne', handleError)
folderSchema.post('deleteMany', handleError)

// Returns the folder data model object which is used to perform actions on the folders collection
// It creates the model if it doesn't exist yet then returns it and just returns it if it does already exist
export default mongoose.models.Folder || mongoose.model('Folder', folderSchema)
