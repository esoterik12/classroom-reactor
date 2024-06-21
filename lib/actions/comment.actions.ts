'use server'
import { revalidatePath } from 'next/cache'
import { connectToDB } from '../mongoose'
import User from '../models/user.models'
import Course from '../models/course.model'
import Comment from '../models/comment.model'

type AddCourseCommentProps = {
  commentText: string
  clerkUserId: string
  pathname: string
  courseId: string
}

export async function addCourseComment({
  commentText,
  clerkUserId,
  pathname,
  courseId
}: AddCourseCommentProps) {
  await connectToDB()

  try {
    const dbUser = await User.findOne({ id: clerkUserId })

    console.log('dbUser', dbUser)

    if (!dbUser) {
      throw new Error('User not found.')
    }

    console.log('dbUser', dbUser)

    const course = await Course.findById(courseId)

    if (!course) {
      throw new Error('Course not found.')
    }

    const savedCommentCreate = new Comment({
      text: commentText,
      authorMongoId: dbUser._id,
      authorClerkId: clerkUserId,
      authorUsername: dbUser.username,
      authorImage: dbUser.image,
      course: course._id
    })

    const saveCommentResult = await savedCommentCreate.save()

    course.discussion.push(savedCommentCreate._id)

    await course.save()

    revalidatePath(pathname)

    console.log('saveCommentResult', saveCommentResult)
  } catch (error: any) {
    throw new Error(`Failed to post comment: ${error.message}`)
  }
}

export async function fetchCourseComments(courseId: string) {
  try {
    await connectToDB()

    const courseCommentsData = await Course.findById(courseId)
      .select('courseName')
      .populate('createdBy', 'username id')
      .populate({
        path: 'discussion',
        select: 'text authorUsername authorClerkId authorMongoId authorImage createdAt parentId children',
        model: Comment
      })

    return courseCommentsData
  } catch (error: any) {
    throw new Error(`Failed to fetch course comments: ${error.message}`)
  }
}
