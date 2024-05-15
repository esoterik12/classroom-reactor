'use server'
import { revalidatePath } from 'next/cache'
import { connectToDB } from '../mongoose'
import User from '../models/user.models'
import Create from '../models/create.model'
import Course from '../models/course.model'
import Comment from '../models/comment.model'
import mongoose, { FilterQuery } from 'mongoose'
import { INewCourse } from '../types'
import { redirect } from 'next/navigation'

export async function addDummyCourses() {
  try {
    console.log('DUMMY COURSE FUNCTION DISABLED')
    return

    await connectToDB()
    await Course.insertMany([
      {
        courseName: 'G11',
        image:
          'https://utfs.io/f/452f60ae-8c90-402b-9b86-7d095daa69bc-r9wb1.png',
        description:
          'Students explore foundational topics in math and science.',
        createdBy: new mongoose.Types.ObjectId('663a299b7eeeec06aa061a1e')
      },
      {
        courseName: 'G12',
        image:
          'https://utfs.io/f/452f60ae-8c90-402b-9b86-7d095daa69bc-r9wb1.png',
        description:
          'Students explore foundational topics in math and science.',
        createdBy: new mongoose.Types.ObjectId('663a299b7eeeec06aa061a1e')
      },
      {
        courseName: 'A11',
        image:
          'https://utfs.io/f/0107b8ff-6e23-492a-89b5-4fd419d6c1b0-r9tb9.png',
        description:
          'This course covers basic principles of art and creativity.',
        createdBy: new mongoose.Types.ObjectId('663a299b7eeeec06aa061a1e')
      },
      {
        courseName: 'A12',
        image:
          'https://utfs.io/f/0107b8ff-6e23-492a-89b5-4fd419d6c1b0-r9tb9.png',
        description:
          'This course covers basic principles of art and creativity.',
        createdBy: new mongoose.Types.ObjectId('663a299b7eeeec06aa061a1e')
      },
      {
        courseName: 'C21',
        image:
          'https://utfs.io/f/f5046243-2327-4f58-ad33-eb0926bb6cf7-r9utl.png',
        description:
          'Students learn about the basics of computing and digital literacy.',
        createdBy: new mongoose.Types.ObjectId('663a299b7eeeec06aa061a1e')
      },
      {
        courseName: 'C22',
        image:
          'https://utfs.io/f/f5046243-2327-4f58-ad33-eb0926bb6cf7-r9utl.png',
        description:
          'Students learn about the basics of computing and digital literacy.',
        createdBy: new mongoose.Types.ObjectId('663a299b7eeeec06aa061a1e')
      },
      {
        courseName: 'G21',
        image:
          'https://utfs.io/f/61279a9e-15ee-4311-83d7-48a976d8e54e-r9xsh.png',
        description:
          'Exploring intermediate concepts in geography and environmental sciences.',
        createdBy: new mongoose.Types.ObjectId('663a299b7eeeec06aa061a1e')
      },
      {
        courseName: 'G22',
        image:
          'https://utfs.io/f/61279a9e-15ee-4311-83d7-48a976d8e54e-r9xsh.png',
        description:
          'Exploring intermediate concepts in geography and environmental sciences.',
        createdBy: new mongoose.Types.ObjectId('663a299b7eeeec06aa061a1e')
      },
      {
        courseName: 'D31',
        image:
          'https://utfs.io/f/e34abfbb-81c2-4763-b12e-48d145709a2d-r9vkb.png',
        description:
          'Introduction to dance and movement as forms of expression.',
        createdBy: new mongoose.Types.ObjectId('663a299b7eeeec06aa061a1e')
      },
      {
        courseName: 'B32',
        image:
          'https://utfs.io/f/ca3551ba-5a69-418f-a05e-90efb89644cc-r9u2v.png',
        description:
          'Basic biology concepts including plant and animal life studies.',
        createdBy: new mongoose.Types.ObjectId('663a299b7eeeec06aa061a1e')
      },
      {
        courseName: 'B41',
        image:
          'https://utfs.io/f/ca3551ba-5a69-418f-a05e-90efb89644cc-r9u2v.png',
        description:
          'Basic biology concepts including plant and animal life studies.',
        createdBy: new mongoose.Types.ObjectId('663a299b7eeeec06aa061a1e')
      }
    ])
  } catch (error: any) {
    console.error(`Failed to create/update user: ${error.message}`)
    throw new Error(`Failed to create/update user: ${error.message}`)
  }
}

// #1 Function used for search
export async function fetchCourses(
  pageNumber = 1,
  pageSize = 20,
  searchString = ''
) {
  await connectToDB()

  // Calculate the number of posts to skip based on the page number and page size.
  const skipAmount = (pageNumber - 1) * pageSize

  // Creates query if there is a searchString (for search)
  const regex = new RegExp(searchString, 'i')
  const query: FilterQuery<typeof Course> = {}
  if (searchString.trim() !== '') {
    query.$or = [
      { courseName: { $regex: regex } },
      { description: { $regex: regex } }
    ]
  }

  const coursesQuery = Course.find(
    searchString === '' ? { parentId: { $in: [null, undefined] } } : query
  )
    .sort({ createdAt: 'asc' })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({
      path: 'createdBy',
      model: User
    })

  const totalCoursesCount = await Course.countDocuments(
    searchString === '' ? { parentId: { $in: [null, undefined] } } : query
  )

  const courses = await coursesQuery.exec()

  const isNext = totalCoursesCount > skipAmount + courses.length

  return { courses, isNext }
}

// #2 Function for populating course main page with all courses
// UNFINISHED: ADD paginaition functionality
export async function fetchCourseTitles() {
  try {
    await connectToDB()
    const courses = await Course.find({}).select('courseName _id image')
    console.log('Course with Modules:', courses)
    return courses
  } catch (error) {
    console.error('Error fetching course:', error)
  }
}

// #3 Function - Not tested - intended to collect the modules and their title to create a list of links
// Use the titles to sort in UI?
export async function fetchCourseAndModulesTitles(courseId: string) {
  try {
    await connectToDB()
    const course = await Course.findById(courseId).populate(
      'createdBy',
      'username id'
    )
    // .populate({
    //   path: 'modules',
    //   select: 'moduleTitle' // Only include the 'moduleTitle' field from each module
    // })
    console.log('Course with Modules:', course)
    return course
  } catch (error) {
    console.error('Error fetching course:', error)
  }
}

export async function addNewCourse({
  courseName,
  image,
  description,
  createdBy,
  path
}: INewCourse): Promise<void> {
  try {
    await connectToDB()

    const newCourse = new Course({
      courseName,
      image,
      description,
      createdBy
    })

    const result = await newCourse.save()
    console.log('result', result)
    revalidatePath(path)
  } catch (error: any) {
    console.log('Error saving new course: ', error)
  } finally {
    redirect('/reactor/courses')
  }
}

export async function updateCourse({
  id,
  courseName,
  image,
  description,
  // createdBy,
  path
}: INewCourse): Promise<void> {
  try {
    await connectToDB()

    await Course.findOneAndUpdate(
      { _id: id },
      {
        courseName,
        image,
        description
        // createdBy
      },
      { upsert: true } // also creates Course if it's a new one
    )
    revalidatePath(path)
  } catch (error: any) {
    throw new Error(`Failed to create/update course: ${error.message}`)
  } finally {
    redirect('/reactor/courses')
  }
}
