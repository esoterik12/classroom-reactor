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
          pipeline: []
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

    return recentActivity
  } catch (error) {
    console.error('Error fetching course:', error)
  } finally {
  }

}
