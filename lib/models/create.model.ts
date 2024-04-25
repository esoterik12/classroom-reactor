import mongoose from 'mongoose'

const createSchema = new mongoose.Schema({
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  creatorUsername: {
    type: String,
    required: true,
  },
  creatorImage: {
    type: String,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  createType: {
    type: String,
    required: true
  },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
})

const Create = mongoose.models.Create || mongoose.model('Create', createSchema)

export default Create
