'use server'
import { revalidatePath } from 'next/cache'
import { connectToDB } from '../mongoose'
import User from '../models/user.models'
import Course from '../models/course.model'
import mongoose, { FilterQuery } from 'mongoose'
import { INewCourse } from '../types'
import { redirect } from 'next/navigation'
import Module from '../models/module.model'
import Create from '../models/create.model'

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

// #1 Function used for search and course homepage (displays all courses)
export async function fetchCourses(
  pageNumber = 1,
  pageSize = 20,
  searchString = '' // default set allows course page to populate all
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

// #3 Collects the modules and their title to create a list of links
// Unfinished: Add sort functionality
export async function fetchCourseAndModulesTitles(courseId: string) {
  try {
    await connectToDB()

    const course = await Course.findById(courseId)
      .populate('createdBy', 'username id')
      .populate({
        path: 'modules',
        select: 'moduleTitle unit',
        model: Module
      })

    return course
  } catch (error) {
    console.error('Error fetching course:', error)
  }
}

// #4 Function - Add a new course with basic details
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
    revalidatePath(path)
  } catch (error: any) {
    console.error('Error saving new course:', error.message)
    throw new Error(`Failed to save new course: ${error.message}`)
  } finally {
    redirect('/reactor/courses')
  }
}

// #5 Fn - unsued for updating (will be implemented with edit)
export async function updateCourse({
  id,
  courseName,
  image,
  description,
  createdBy,
  path
}: INewCourse): Promise<void> {
  try {
    await connectToDB()

    await Course.findOneAndUpdate(
      { _id: id },
      {
        courseName,
        image,
        description,
        createdBy
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

interface ICourseMember {
  user: mongoose.Types.ObjectId | string // User's ObjectId, converted to string if necessary
  role: 'student' | 'teacher' | 'staff' // Enum type for role
}

export async function addCourseMembers({
  courseId,
  memberUsernames,
  membersRole,
  pathname
}: {
  courseId: string
  memberUsernames: string[]
  membersRole: 'student' | 'teacher' | 'staff'
  pathname: string
}) {
  try {
    await connectToDB()
    const course = await Course.findById(courseId)
    const users = await User.find({ username: { $in: memberUsernames } })

    // Check if valid course and user(s)
    if (!course) {
      throw new Error(`Course with ID ${courseId} not found`)
    }
    if (!users) {
      throw new Error(`User or users not found`)
    }

    // Filter out users already in the course
    const existingMemberIds = new Set(
      course.members.map((m: ICourseMember) => m.user.toString())
    )
    const newMembers = users.filter(
      user => !existingMemberIds.has(user._id.toString())
    )

    course.members.push(
      ...newMembers.map(user => ({
        user: user._id,
        role: membersRole
      }))
    )

    await course.save()

    return {
      success: true,
      message: `${newMembers.length} user(s) added to course with ID ${courseId}`
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update course: ${error.message}`)
  } finally {
    revalidatePath(pathname)
  }
}

export async function fetchCourseMembers(courseId: string) {
  try {
    await connectToDB()

    const courseWithMembersData = await Course.findById(courseId).populate({
      path: 'members.user', // Path to the user reference in the members array
      select: 'username _id image name id' // Fields to include from the User model (add other fields as needed)
    })

    if (!courseWithMembersData) {
      console.log('No course found with the given ID')
      return null
    }

    return courseWithMembersData
  } catch (error: any) {
    throw new Error(`Failed to fetch course members: ${error.message}`)
  }
}

export async function fetchCourseCreates(courseId: string) {
  try {
    await connectToDB()

    const courseCreates = await Course.findById(courseId).select('creates')

    if (!courseCreates) {
      throw new Error(`No creates matching course ${courseId} found.`)
    }

    console.log('courseCreates', courseCreates)
    return courseCreates
  } catch (error: any) {
    throw new Error(`Failed to fetch course creates: ${error}`)
  }
}

export async function removeCourseMember(
  courseId: string,
  userId: string,
  pathname: string
) {
  try {
    await connectToDB()

    const removeResult = await Course.findByIdAndUpdate(courseId, {
      $pull: { members: { user: userId } }
    })

    console.log('removeResult', removeResult)
  } catch (error: any) {
    throw new Error(`Failed to remove course member: ${error.message}`)
  } finally {
    revalidatePath(pathname)
  }
}

export async function deleteCourse(courseId: string) {
  try {
    await connectToDB()

    // UNFINISHED
    // Before deleting need to find all creates that have a creates[] entry for this course and remove it
    // Added complexity: delete the create if it is part of NO course?
    // Solution for general creates: make general courses / can't be deleted
    const updatedCreates = await Create.updateMany(
      { courses: courseId },
      { $pull: { creates: courseId } }
    )
    if (!updatedCreates) {
      console.log('No creates found in deleted course.')
    }

    const result = await Course.findByIdAndDelete(courseId)

    if (!result) {
      throw new Error(`Failed to delete: Course of id ${courseId} no found.`)
    }

    console.log(`Course ${courseId} deleted successfully.`);
  } catch (error: any) {
    throw new Error(`Failed to delete course with id of ${courseId}`)
  } finally {
    redirect(`/reactor/courses/`)
  }
}
