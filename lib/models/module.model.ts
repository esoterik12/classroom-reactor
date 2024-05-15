import mongoose from 'mongoose'

const moduleSchema = new mongoose.Schema({
  moduleTitle: {
    type: String,
    required: true
  },
  image: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  htmlContent: {
    type: String
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }
})

const Module = mongoose.model('Module', moduleSchema)

export default Module
