'use server'
import { FilterQuery, SortOrder } from 'mongoose'
import { revalidatePath } from 'next/cache'
import User from '../models/user.models'
import Course from '../models/course.model'
import { connectToDB } from '../mongoose'
import { redirect } from 'next/navigation'
import Create from '../models/create.model'
import Comment from '../models/comment.model'

export async function fetchUser(userId: string) {
  try {
    connectToDB()

    return await User.findOne({ id: userId })
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`)
  }
}

export async function fetchUserJSON(userId: string) {
  try {
    connectToDB()

    const userResult = await User.findOne({ id: userId })

    return JSON.stringify(userResult)
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`)
  }
}

interface Params {
  userId: string
  username: string
  name: string
  bio: string
  image: string | null
  path: string
}

export async function updateUser({
  userId,
  bio,
  name,
  username,
  image
}: Params): Promise<void> {
  try {
    await connectToDB()

    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true
      },
      { upsert: true }
    )
    revalidatePath(`/reactor/profile/${userId}`) // Revalidate to refresh profile after edit made
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`)
  } finally {
    redirect(`/reactor/profile/${userId}`)
  }
}

interface IFetchUserCreates {
  userId: string
  pageNumber: number
  pageSize: number
}

export async function fetchUserCreates({
  userId,
  pageNumber,
  pageSize = 20
}: IFetchUserCreates) {
  try {
    await connectToDB()

    // Calculate the number of posts to skip
    const skipAmount = (pageNumber - 1) * pageSize

    const userCreatesQuery = Create.find({ creator: userId })
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

    const totalCreatesCount = await Create.countDocuments({ creator: userId })

    const creates = await userCreatesQuery.exec()

    const isNext = totalCreatesCount > skipAmount + creates.length

    return { creates, isNext }
  } catch (error) {
    console.log('Error fetching user creates: ', error)
    throw error
  }
}
