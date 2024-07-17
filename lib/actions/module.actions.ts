'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { connectToDB } from '../mongoose'
import Course from '../models/course.model'
import Module from '../models/module.model'
import User from '../models/user.models'

export async function fetchModule(moduleId: string) {
  try {
    await connectToDB()

    const fetchedModule = Module.findById(moduleId)
    if (!module) {
      throw new Error(`No module matching course ${moduleId} found.`)
    }

    return fetchedModule
  } catch (error: any) {
    console.error('Error fetching module:', error.message)
    throw new Error(`Failed to fetch module: ${error.message}`)
  }
}

export async function addNewModule({
  courseId,
  moduleTitle,
  content,
  unit,
  lesson,
  createdBy,
  pathname
}: {
  courseId: string
  moduleTitle: string
  content: string | null
  unit: number
  lesson: number
  createdBy: string
  pathname: string
}) {
  try {
    await connectToDB()

    const newModule = new Module({
      moduleTitle,
      htmlContent: content,
      unit,
      lesson,
      createdBy
    })

    const savedModule = await newModule.save()

    await Course.updateOne(
      { _id: courseId },
      { $push: { modules: savedModule._id } }
    )

    revalidatePath(pathname)
    console.log(`New module added to course ${courseId}`)
    return {
      success: true,
      message: `Module added successfully to course ${courseId}`
    }
  } catch (error: any) {
    console.error('Error saving new module:', error.message)
    throw new Error(`Failed to save new module: ${error.message}`)
  } finally {
    redirect(`/reactor/courses/${courseId}`)
  }
}

// Created a separate updateModule function for initial simplicity
// May be worth merging with new module function

export async function updateModule({
  moduleId,
  moduleTitle,
  content,
  unit,
  lesson,
  pathname
}: {
  moduleId: string
  moduleTitle: string
  content: string | null
  unit: number
  lesson: number
  pathname: string
}) {
  try {
    await connectToDB()

    await Module.findOneAndUpdate(
      { _id: moduleId },
      {
        moduleTitle,
        htmlContent: content,
        unit,
        lesson
      }
    )
    revalidatePath(pathname)
  } catch (error: any) {
    throw new Error(`Failed to update module: ${error.message}`)
  }
}

export async function deleteModule({
  userMongoId,
  moduleId,
  courseId
}: {
  userMongoId: string
  moduleId: string
  courseId: string
}) {
  try {
    await connectToDB()

    const user = await User.findById(userMongoId)

    if (user.permissions !== 'admin') {
      return {
        code: 403,
        message: 'Error 403: You do not have permission to remove a module.'
      }
    }

    const moduleFromDB = await Module.findByIdAndDelete(moduleId)

    if (!moduleFromDB) {
      return {
        code: 404,
        message: `Module with ID ${moduleId} not found.`
      }
    }

    const updatedCourse = await Course.updateOne(
      { _id: courseId },
      { $pull: { modules: moduleId } }
    )

    // Check if the update was successful (GPT suggested improvement)
    if (updatedCourse.matchedCount === 0) {
      return {
        code: 404,
        message: `Course with ID ${courseId} not found`
      }
    }
    console.log(`Module ${moduleId} deleted successfully.`)
  } catch (error: any) {
    console.error(`Failed to delete module with id ${moduleId}`, error)
    return {
      code: 500,
      message: `Failed to delete module: ${error.message}`
    }
  } finally {
    redirect(`/reactor/courses/${courseId}`)
  }
}
