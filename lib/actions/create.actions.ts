'use server'
import { revalidatePath } from 'next/cache'
import { connectToDB } from '../mongoose'
import { IPostCreate } from '../types'
import User from '../models/user.models'
import Create from '../models/create.model'
import Course from '../models/course.model'
import Comment from '../models/comment.model'
import selectGenerator from '../generators'
import { FilterQuery } from 'mongoose'

export async function fetchCreates(
  pageNumber = 1,
  pageSize = 20,
  searchString = ''
) {
  await connectToDB()

  // Calculate the number of posts to skip based on the page number and page size.
  const skipAmount = (pageNumber - 1) * pageSize

  // Creates query if there is a searchString (for search)
  const regex = new RegExp(searchString, 'i')
  const query: FilterQuery<typeof Create> = {}
  if (searchString.trim() !== '') {
    query.$or = [
      { createType: { $regex: regex } },
      { creatorUsername: { $regex: regex } }
    ]
  }

  // UNIFINISHED - fetching too much data for the search / display / activity pages?
  const createQuery = Create.find(
    searchString === '' ? { parentId: { $in: [null, undefined] } } : query
  )
    .select('_id creator content createType children image createdAt')
    .sort({ createdAt: 'desc' })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({
      path: 'creator',
      model: 'User',
      select: 'username image id'
    })

  const totalCreatesCount = await Create.countDocuments(
    searchString === '' ? { parentId: { $in: [null, undefined] } } : query
  )

  const creates = await createQuery.exec()

  const isNext = totalCreatesCount > skipAmount + creates.length

  console.log('creates in fetch many creates server action', creates)
  return { creates, isNext }
}

export async function fetchSingleCreate(createId: string) {
  await connectToDB()

  const fetchedCreate = await Create.findById(createId)
    .populate({
      path: 'creator',
      model: 'User',
      select: 'username image id'
    })
    .populate({
      path: 'children',
      model: 'Comment',
      populate: {
        path: 'authorMongoId', // Path to the user who authored the comment
        model: 'User',
        select: 'username image id' // Selecting specific fields
      }
    })

  return fetchedCreate
}

// Post new create to DB that uses a selected generator function based on createType
export async function postCreate({
  content,
  createType,
  creator,
  creatorClerkId,
  course
}: IPostCreate) {
  try {
    console.log('content', content)
    console.log('createType', createType)
    const processedContent = selectGenerator({ createType, content })
    console.log('processedContent', processedContent)

    // UNFINISHED testing processing and submission
    await connectToDB()

    const courseIdObject = await Course.findOne({ id: course }, { _id: 1 })
    // Creates an array object from the courseIdObject to match the array in the Create model
    const courseArray = Array.isArray(courseIdObject)
      ? courseIdObject
      : [courseIdObject]

    const preparedContent = {
      content: processedContent,
      title: content.title // Currently typed in IPostCreate as any
    }

    const postedCreate = await Create.create({
      content: preparedContent,
      creator,
      creatorClerkId,
      createType,
      courses: courseArray // Assign courseIdObject if provided, or leave it null for personal account
    })

    // Update User model
    await User.findByIdAndUpdate(creator, {
      $push: { creates: postedCreate._id }
    })

    // UNFINISHED this is probably not the best way to revalidate
    revalidatePath('/')

    // returns id to be used in router.push on in CreateX component
    return postedCreate._id.toString()
  } catch (error: any) {
    throw new Error(`Failed to create in create.actions.ts: ${error.message}`)
  }
}

async function fetchAllCreateComments(createId: string): Promise<any[]> {
  const childComments = await Comment.find({ parentId: createId })

  // const descendantComments = []
  // for (const childComment of childComments) {
  //   const descendants = await fetchAllCreateComments(childComment._id)
  //   descendantComments.push(childComment, ...descendants)
  // }

  // return descendantComments
  return childComments
}

export async function deleteCreate(id: string): Promise<void> {
  try {
    connectToDB()

    // Find main create to delete
    const mainCreate = await Create.findById(id).populate('creator')

    if (!mainCreate) {
      throw new Error('Create not found.')
    }

    // Fetch all child comments directly associated with the create plus their descendants
    const directChildComments = await Comment.find({ parentId: id })
    const allDescendantComments = []

    for (const childComment of directChildComments) {
      const descendants = await fetchAllCreateComments(childComment._id)
      allDescendantComments.push(childComment, ...descendants)
    }

    const allCommentIds = [...allDescendantComments.map(comment => comment._id)]

    console.log('All related comments', allDescendantComments)

    const uniqueAuthorIds = new Set(
      [
        ...allDescendantComments.map(comment =>
          comment.authorMongoId?._id?.toString()
        ),
        mainCreate.creator?._id?.toString()
      ].filter(id => id !== undefined)
    )

    await Create.deleteOne({ _id: id })
    await Comment.deleteMany({ _id: { $in: allCommentIds } })

    // Update User model
    await User.updateMany(
      { _id: { $in: Array.from(uniqueAuthorIds) } },
      { $pull: { creates: id } }
    )
  } catch (error: any) {
    throw new Error(`Failed to delete thread: ${error.message}`)
  }
}

export async function addCreateComment(
  createId: string,
  commentText: string,
  clerkUserId: string,
  path: string
) {
  connectToDB()

  try {
    const dbUser = await User.findOne({ id: clerkUserId })

    if (!dbUser) {
      throw new Error('User not found.')
    }

    console.log('dbUser', dbUser)

    const originalCreate = await Create.findById(createId)

    if (!originalCreate) {
      throw new Error('Create not found.')
    }

    const savedCommentCreate = new Comment({
      text: commentText,
      authorMongoId: dbUser._id,
      authorClerkId: clerkUserId,
      authorUsername: dbUser.username,
      authorImage: dbUser.image,
      parentId: originalCreate._id
    })

    const saveCommentResult = await savedCommentCreate.save()

    originalCreate.children.push(savedCommentCreate._id)

    await originalCreate.save()

    revalidatePath(path)

    console.log('saveCommentResult', saveCommentResult)
  } catch (error: any) {
    throw new Error(`Failed to post comment: ${error.message}`)
  }
}
