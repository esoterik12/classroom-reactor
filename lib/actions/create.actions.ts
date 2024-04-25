'use server'
import { revalidatePath } from 'next/cache'
import { connectToDB } from '../mongoose'
import { IPostCreate } from '../types'
import User from '../models/user.models'
import Create from '../models/create.model'
import Course from '../models/course.model'
import Comment from '../models/comment.model'

export async function fetchCreate(pageNumber = 1, pageSize = 20) {
  await connectToDB()

  // Calculate the number of posts to skip based on the page number and page size.
  const skipAmount = (pageNumber - 1) * pageSize

  const createQuery = Create.find({ parentId: { $in: [null, undefined] } })
    .sort({ createdAt: 'desc' })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({
      path: 'creator',
      model: User
    })
    .populate({
      path: 'course',
      model: Course
    })
    .populate({
      path: 'children', // Populate the children field
      populate: {
        path: 'author', // Populate the author field within children
        model: User,
        select: '_id name parentId image' // Select only _id and username fields of the author
      }
    })

  const totalCreatesCount = await Create.countDocuments({
    parentId: { $in: [null, undefined] }
  })

  const creates = await createQuery.exec()

  const isNext = totalCreatesCount > skipAmount + creates.length

  return { creates, isNext }
}

export async function postCreate({
  content,
  createType,
  creator,
  course,
  creatorUsername,
  creatorImage
}: IPostCreate) {
  try {
    await connectToDB()

    // Possible issue here - check github
    const courseIdObject = await Course.findOne({ id: course }, { _id: 1 })

    const postedCreate = await Create.create({
      content,
      creator,
      createType,
      course: courseIdObject, // Assign communityId if provided, or leave it null for personal account
      creatorUsername,
      creatorImage
    })

    // Update User model
    await User.findByIdAndUpdate(creator, {
      $push: { creates: postedCreate._id }
    })

    if (courseIdObject) {
      // Update Community model
      await Course.findByIdAndUpdate(courseIdObject, {
        $push: { threads: postedCreate._id }
      })
    }

    // revalidatePath(path)
  } catch (error: any) {
    throw new Error(`Failed to create thread: ${error.message}`)
  }
}

// UNFINISHED
export async function deleteCreate(id: string, path: string): Promise<void> {
  try {
    connectToDB()

    const mainCreate = await Create.findById(id).populate('creator course')

    if (!mainCreate) {
      throw new Error('Create not found.')
    }

    // Find descendants or children
  } catch (error) {}
}

export async function addCreateComment(
  createId: string,
  commentText: string,
  userId: string,
  path: string
) {
  connectToDB()

  try {
    const originalCreate = await Create.findById(createId)

    if (!originalCreate) {
      throw new Error('Create not found.')
    }

    const savedCommentCreate = new Comment({
      text: commentText,
      author: userId,
      parentId: createId
    })

    originalCreate.children.push(savedCommentCreate._id)

    await originalCreate.save()
  } catch (error) {}
}
