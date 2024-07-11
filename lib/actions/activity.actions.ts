'use server'
import { revalidatePath } from 'next/cache'
import { connectToDB } from '../mongoose'
import User from '../models/user.models'

export async function fetchLatestActivity(pageNumber = 1, pageSize = 20) {
  const skipAmount = (pageNumber - 1) * pageSize

  try {
    await connectToDB()

    const recentActivity = await User.aggregate([
      {
        $unionWith: {
          coll: 'comments',
          pipeline: []
        }
      },
      {
        $unionWith: {
          coll: 'courses',
          pipeline: [
            {
              $project: {
                courseName: 1,
                _id: 1,
                createdAt: 1,
                image: 1
              }
            }
          ]
        }
      },
      {
        // -Joins "comments" with "users" using the authorMongoId field to match with _id foreignField
        // in "users" collection - creates array courseDetails with data.
        $lookup: {
          from: 'users',
          localField: 'authorMongoId',
          foreignField: '_id',
          as: 'authorDetails'
        }
      },
      {
        $lookup: {
          from: 'courses',
          localField: 'course',
          foreignField: '_id',
          as: 'courseDetails',
          pipeline: [
            {
              $project: {
                courseName: 1,
                _id: 1
              }
            }
          ]
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $skip: skipAmount
      },
      {
        $limit: 20
      },
      {
        $unwind: {
          path: '$authorDetails',
          preserveNullAndEmptyArrays: true // Keeps comments without authors intact
        }
      },
      {
        $unwind: {
          path: '$courseDetails',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        // Project the fields needed in final output - minor processing overhead
        // Each entry marked with which components use the data
        $project: {
          _id: 1, // All (User, Comment, Course)
          id: 1, // Comment (Clerk ID for profile link)
          createdAt: 1, // All
          courseName: 1, // Course
          username: 1, // User
          image: 1, // Course + User
          authorMongoId: 1, // Comment
          authorDetails: 1, // Comment
          courseDetails: 1, // Comment
          text: 1 // Comment
        }
      }
    ])

    console.log('recentActivity', recentActivity.length)

    // returns [{totalDocuments: x}]
    const totalResultsCount = await User.aggregate([
      {
        $unionWith: {
          coll: 'comments',
          pipeline: []
        }
      },
      {
        $unionWith: {
          coll: 'courses',
          pipeline: []
        }
      },
      {
        $count: 'totalDocuments'
      }
    ])

    const isNext =
      totalResultsCount[0].totalDocuments > skipAmount + recentActivity.length

    return { fetchActivityResults: recentActivity, isNext: isNext }
  } catch (error) {
    console.error('Error fetching course:', error)
  } finally {
  }
}
