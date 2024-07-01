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
  members: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      role: {
        type: String,
        required: true,
        enum: ['student', 'teacher', 'staff'] 
      }
    }
  ],
  modules: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Module'
    }
  ],
  discussion: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
})

const Course = mongoose.models.Course || mongoose.model('Course', courseSchema)

export default Course
