'use server'
import { revalidatePath } from 'next/cache'
import { connectToDB } from '../mongoose'
import User from '../models/user.models'
import Course from '../models/course.model'
import Comment from '../models/comment.model'

type AddCourseCommentProps = {
  commentText: string
  userMongoID: string
  pathname: string
  courseId: string
}

export async function addCourseComment({
  commentText,
  userMongoID,
  pathname,
  courseId
}: AddCourseCommentProps) {
  await connectToDB()

  try {
    const course = await Course.findById(courseId)

    if (!course) {
      throw new Error('Course not found.')
    }

    const savedCommentCreate = new Comment({
      text: commentText,
      authorMongoId: userMongoID,
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
        select:
          'text authorMongoId createdAt parentId children',
        model: Comment,
        populate: {
          path: 'authorMongoId',
          select: 'username id image',
          model: User
        }
      })

    return courseCommentsData
  } catch (error: any) {
    throw new Error(`Failed to fetch course comments: ${error.message}`)
  }
}
