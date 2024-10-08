import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  permissions: {
    type: String,
    default: 'member',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: String,
  bio: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  onboarded: {
    type: Boolean,
    default: false
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    }
  ]
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User
