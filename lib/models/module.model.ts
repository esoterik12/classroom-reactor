import mongoose from 'mongoose'

const moduleSchema = new mongoose.Schema({
  moduleTitle: {
    type: String,
    required: true
  },
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
  unit: {
    type: Number,
    required: true
  },
  lesson: {
    type: Number,
    required: true
  }
})

const Module = mongoose.models.Module || mongoose.model('Module', moduleSchema)

export default Module
