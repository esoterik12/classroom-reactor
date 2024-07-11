'use server'
import { revalidatePath } from 'next/cache'
import { connectToDB } from '../mongoose'
import User from '../models/user.models'
import Course from '../models/course.model'
import Comment from '../models/comment.model'
import mongoose from 'mongoose'

type AddCourseCommentProps = {
  commentText: string
  userMongoID: string
  pathname: string
  courseId: string
}

type MemberObjectProps = {
  _id: mongoose.Types.ObjectId
  user: mongoose.Types.ObjectId
  role: string
}

export async function addCourseComment({
  commentText,
  userMongoID,
  pathname,
  courseId
}: AddCourseCommentProps) {
  try {
    await connectToDB()

    const course = await Course.findById(courseId)

    if (!course) {
      throw new Error('Course not found.')
    }

    // Disabllow users not enrolled in the course from commenting
    const userObjectId = new mongoose.Types.ObjectId(userMongoID)
    if (
      !course.members.some((member: MemberObjectProps) =>
        member.user.equals(userObjectId)
      )
    ) {
      return { message: 'You are not enrolled in this course.' }
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
    return { message: 'Comment posted.' }
  } catch (error: any) {
    throw new Error(`Failed to post comment: ${error.message}`)
  }
}

export async function fetchCourseComments(
  courseId: string,
  pageNumber = 1,
  pageSize = 10
) {
  try {
    await connectToDB()

    // UNFINISHED: Add pagination
    const skipAmount = (pageNumber - 1) * pageSize

    // Creates an object with course info
    // Populating creator basic data and array of comment (discussion) objects
    // Each object has a authorMongoId object with author of comment data
    const courseCommentsData = await Course.findById(courseId)
      .select('courseName')
      .sort({ createdAt: 'asc' })
      .populate('createdBy', 'username id')
      .populate({
        path: 'discussion',
        select: 'text authorMongoId createdAt parentId children',
        model: Comment,
        options: { limit: pageSize, skip: skipAmount },
        populate: {
          path: 'authorMongoId',
          select: 'username id image',
          model: User
        }
      })

    const totalCommentsInCourseObject = await Course.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(courseId) } },
      {
        $project: { commentsCount: { $size: { $ifNull: ['$discussion', []] } } }
      } // $ifNull will handle missing or null comments field
    ])

    const isNext =
      totalCommentsInCourseObject[0].commentsCount >
      skipAmount + courseCommentsData.discussion.length

    return { courseCommentsData, isNext }
  } catch (error: any) {
    throw new Error(`Failed to fetch course comments: ${error.message}`)
  }
}
