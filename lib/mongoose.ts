import mongoose from "mongoose";

let isConnected = false

export const connectToDB = async () => {
  // Strict mode prevents unknown field queries
  mongoose.set("strictQuery", true)

  if (!process.env.MONGODB_URL) return console.log('Missing MongoDB URL')

  if (isConnected) {
    console.log('MongoDB already connected')
    return
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL)
    isConnected = true
    console.log("MongoDB connected!")
  } catch (error) {
    console.log('Error connecting to DB: ', error)
  }
}