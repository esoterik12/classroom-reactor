'use server'
import { revalidatePath } from 'next/cache'
import { connectToDB } from '../mongoose'

import User from '../models/user.models'
import Create from '../models/create.model'
import Course from '../models/course.model'

export async function fetchCreate(pageNumber = 1, pageSize = 20) {
  await connectToDB()

  // Calculate the number of posts to skip based on the page number and page size.
  const skipAmount = (pageNumber - 1) * pageSize

  const createQuery = Create.find({ parentId: { $in: [null, undefined] } })
    .sort({ createAt: 'desc' })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({
      path: 'author',
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

interface IPostCreate {
  text: string
  createType: string
  title: string
  creator: string
  course: string | null
  path: string
}

export async function postCreate({ text, createType, title, creator, course, path }: IPostCreate) {
  try {
    await connectToDB()

    // Possible issue here - check github
    const courseIdObject = await Course.findOne({ id: course }, { _id: 1 })

    const postedCreate = await Create.create({
      text,
      title,
      creator,
      createType,
      course: courseIdObject // Assign communityId if provided, or leave it null for personal account
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
