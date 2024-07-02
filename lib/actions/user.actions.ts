'use server'
import { FilterQuery } from 'mongoose'
import { revalidatePath } from 'next/cache'
import User from '../models/user.models'
import { connectToDB } from '../mongoose'
import { redirect } from 'next/navigation'

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

export async function fetchUsers({
  userId,
  searchString = '',
  searchType = '',
  pageNumber = 1,
  pageSize = 20,
  sortBy = 'desc'
}: {
  userId: string
  searchString?: string
  searchType?: string
  pageNumber?: number
  pageSize?: number
  sortBy?: string
}) {
  try {
    connectToDB()

    const skipAmount = (pageNumber - 1) * pageSize

    const regex = new RegExp(searchString, 'i')

    const query: FilterQuery<typeof User> = {
      id: { $ne: userId } // Excludes current user from results
    }

    // If the search string is not empty, add the $or operator to match either username or name fields.
    if (searchString.trim() !== '') {
      query.$or = [{ username: { $regex: regex } }, { name: { $regex: regex } }]
    }

    // UNFINISHED: Define the sort options
    const sortOptions = {}

    const usersQuery = User.find(query).skip(skipAmount).limit(pageSize)

    const totalUsersCount = await User.countDocuments(query)

    const users = await usersQuery.exec()

    const isNext = totalUsersCount > skipAmount + users.length

    return { users, isNext }
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}

export interface IUpdateUser {
  userId: string
  username: string
  name: string
  bio: string
  image: string | null
  path?: string
}

export async function updateUser({
  userId,
  bio,
  name,
  username,
  image
}: IUpdateUser): Promise<void> {
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
      { upsert: true } // Means it also creates User if not found
    )
    revalidatePath(`/reactor/profile/${userId}`) // Revalidate to refresh profile after edit made
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`)
  } finally {
    redirect(`/reactor/profile/${userId}`)
  }
}
