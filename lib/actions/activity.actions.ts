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
        $lookup: {
          from: 'users', // The collection to join with
          localField: 'authorMongoId', // The field from the 'comments' collection
          foreignField: '_id', // The field from the 'users' collection
          as: 'authorDetails' // The name of the new array field to add to the input documents
        }
      },
      {
        $lookup: {
          from: 'courses', // The collection to join with
          localField: 'course', // The field from the 'comments' collection
          foreignField: '_id', // The field from the 'users' collection
          as: 'courseDetails', // The name of the new array field to add to the input documents
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
          preserveNullAndEmptyArrays: true // Keeps comments without authors intact
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
