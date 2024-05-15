import mongoose from 'mongoose'

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true
  },
  image: String,
  description: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  creates: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Create'
    }
  ],
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  modules: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Module'
    }
  ]
})

const Course = mongoose.models.Course || mongoose.model('Course', courseSchema)

export default Course
