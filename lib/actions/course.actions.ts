'use server'
import { revalidatePath } from 'next/cache'
import { connectToDB } from '../mongoose'
import User from '../models/user.models'
import Course from '../models/course.model'
import mongoose, { FilterQuery } from 'mongoose'
import { NewCourseProps, ModuleDisplayProps, ICourseContainer } from '../types'
import { redirect } from 'next/navigation'
import Module from '../models/module.model'

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
    .select('discussion _id courseName image members')
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
export async function fetchCourseAndModulesTitles(
  courseId: string
): Promise<ICourseContainer | undefined> {
  try {
    await connectToDB()

    const course = await Course.findById(courseId)
      .populate('createdBy', 'username id')
      .populate({
        path: 'modules',
        select: 'moduleTitle unit lesson',
        model: Module
      })

    course.modules.sort((a: ModuleDisplayProps, b: ModuleDisplayProps) => {
      if (a.unit < b.unit) return -1
      if (a.unit > b.unit) return 1

      if (a.lesson < b.lesson) return -1
      if (a.lesson > b.lesson) return 1

      return 0
    })

    const groupedByUnit = course.modules.reduce(
      (acc: ModuleDisplayProps[][], current: ModuleDisplayProps) => {
        const unitIndex = current.unit - 1
        if (!acc[unitIndex]) {
          acc[unitIndex] = []
        }
        acc[unitIndex].push(current)
        return acc
      },
      []
    )

    course.modules = groupedByUnit

    const courseWithModules: ICourseContainer = {
      courseId: course._id,
      courseName: course.courseName,
      image: course.image,
      description: course.description,
      createdBy: course.createdBy,
      createdAt: course.createdAt,
      modules: groupedByUnit
    }

    return courseWithModules
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
}: NewCourseProps): Promise<void> {
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
}: NewCourseProps): Promise<void> {
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

interface CourseMember {
  user: mongoose.Types.ObjectId | string
  role: 'student' | 'teacher' | 'staff'
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
      course.members.map((m: CourseMember) => m.user.toString())
    )
    const newMembers = users.filter(
      user => !existingMemberIds.has(user._id.toString())
    )

    if (newMembers.length === 0) {
      console.log('error newMembers.length === 0')
      return {
        success: false,
        message: `${newMembers.length} user(s) added to course with ID ${courseId}`
      }
    }

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

export async function changeCourseRole({
  courseId,
  memberId,
  membersRole,
  pathname
}: {
  courseId: string
  memberId: string
  membersRole: 'student' | 'teacher' | 'staff'
  pathname: string
}) {
  try {
    await connectToDB()
    const course = await Course.findById(courseId)

    const updatedUsers = course.members.map((user: CourseMember) => {
      if (user.user.toString() === memberId) {
        return { ...user, role: membersRole }
      }
      return user
    })

    course.members = updatedUsers

    await course.save()

    return {
      success: true,
      message: `User of id:${memberId} changed to role ${membersRole}`
    }
  } catch (error: any) {
    throw new Error(`Failed to change user role: ${error.message}`)
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

    const result = await Course.findByIdAndDelete(courseId)

    if (!result) {
      throw new Error(`Failed to delete: Course of id ${courseId} no found.`)
    }

    console.log(`Course ${courseId} deleted successfully.`)
  } catch (error: any) {
    throw new Error(`Failed to delete course with id of ${courseId}`)
  } finally {
    redirect(`/reactor/courses/`)
  }
}
