import mongoose from 'mongoose'

import handleError from '../middleware/db'

// User data model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
})

userSchema.post('save', handleError)
userSchema.post('find', handleError)
userSchema.post('findOne', handleError)
userSchema.post('deleteOne', handleError)
userSchema.post('deleteMany', handleError)

// Returns the user data model object which is used to perform actions on the users collection
// It creates the model if it doesn't exist yet then returns it and just returns it if it does already exist
export default mongoose.models.User || mongoose.model('User', userSchema)
