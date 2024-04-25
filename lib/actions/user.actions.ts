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
    connectToDB()
    console.log('Trying to update user')
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

export async function fetchUserCreates(userId: string) {
  try {
    await connectToDB()

    const creates = await Create.find({ creator: userId })

    console.log('creates in server actions', creates)

    return creates
  } catch (error) {
    console.log('Error fetching user creates: ', error)
    throw error
  }
}
