'use server'
import { FilterQuery } from 'mongoose'
import { revalidatePath } from 'next/cache'
import User from '../models/user.models'
import Course from '../models/course.model'
import { connectToDB } from '../mongoose'
import { redirect } from 'next/navigation'
import Create from '../models/create.model'


export async function addDummyUsers() {
  try {
    await connectToDB()

    console.log('DUMMY USER FUNCTION DISABLED')
    return 
    await User.insertMany([
      {
        id: 'user_1aBcdEfghIjklMnopQrStuvWxYz1234',
        bio: 'Passionate about technology and innovation.',
        username: 'TechGuru',
        name: 'Alice Smith',
        image: 'https://utfs.io/f/10711b1c-da67-4344-9a6f-cc1c5508bb08-r9tb9.png',
        onboarded: true
      },
      {
        id: 'user_2aBcdEfghIjklMnopQrStuvWxYz5678',
        bio: 'Lover of the arts and all things creative.',
        username: 'ArtLover',
        name: 'Bob Johnson',
        image: 'https://utfs.io/f/bb7fd756-95e0-4ef2-ac9b-793100abb3a1-7x8usz.png',
        onboarded: true
      },
      {
        id: 'user_3aBcdEfghIjklMnopQrStuvWxYz9101',
        bio: 'Avid reader and aspiring writer.',
        username: 'Bookworm',
        name: 'Charlie Brown',
        image: 'https://utfs.io/f/77193005-66b1-42f5-b28c-149ba8c37904-hsud09.png',
        onboarded: true
      },
      {
        id: 'user_4aBcdEfghIjklMnopQrStuvWxYz1121',
        bio: 'Fitness enthusiast and health advocate.',
        username: 'FitFanatic',
        name: 'Dana White',
        image: 'https://utfs.io/f/6ac6e089-fd92-43ea-8017-6f20df790df6-7r8qrp.png',
        onboarded: true
      },
      {
        id: 'user_5aBcdEfghIjklMnopQrStuvWxYz3141',
        bio: 'Tech entrepreneur with a passion for startups.',
        username: 'StartupStar',
        name: 'Eli Black',
        image: 'https://utfs.io/f/15b8fb2b-ea69-458c-a745-2904a4508a0a-7cgjui.png',
        onboarded: true
      },
      {
        id: 'user_6aBcdEfghIjklMnopQrStuvWxYz5161',
        bio: 'Nature lover and outdoor adventurer.',
        username: 'NatureNerd',
        name: 'Fay Green',
        image: 'https://utfs.io/f/83e761f5-452c-4585-8332-f6b47c407178-1ap.png',
        onboarded: true
      },
      {
        id: 'user_7aBcdEfghIjklMnopQrStuvWxYz7181',
        bio: 'Gamer and tech enthusiast.',
        username: 'GameGeek',
        name: 'Gary Blue',
        image: 'https://utfs.io/f/5b1fb643-a1ae-4026-a440-34802fd08a41-fvmr7a.png',
        onboarded: true
      },
      {
        id: 'user_8aBcdEfghIjklMnopQrStuvWxYz9201',
        bio: 'Foodie and culinary explorer.',
        username: 'FoodFan',
        name: 'Helen Gray',
        image: 'https://utfs.io/f/10711b1c-da67-4344-9a6f-cc1c5508bb08-r9tb9.png',
        onboarded: true
      }
    ])
    console.log('added dummy users') // Revalidate to refresh profile after edit made
  } catch (error: any) {
    console.error(`Failed to create/update user: ${error.message}`);
    throw new Error(`Failed to create/update user: ${error.message}`)
  } 
}

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
