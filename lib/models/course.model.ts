import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: String,
  bio: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  creates: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Create",
    },
  ],
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Course =
  mongoose.models.Course || mongoose.model("Course", courseSchema);

export default Course;