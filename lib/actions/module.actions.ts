'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { connectToDB } from '../mongoose'
import Course from '../models/course.model'
import Module from '../models/module.model'

export async function fetchModule(moduleId: string) {
  try {
    await connectToDB()

    const module = Module.findById(moduleId)
    if (!module) {
      throw new Error(`No module matching course ${moduleId} found.`)
    }

    return module
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
  createdBy,
  pathname
}: {
  courseId: string
  moduleTitle: string
  content: string | null
  unit: number
  createdBy: string
  pathname: string
}) {
  try {
    await connectToDB()

    const newModule = new Module({
      moduleTitle,
      htmlContent: content,
      unit,
      createdBy,
      course: courseId
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
  pathname
}: {
  moduleId: string
  moduleTitle: string
  content: string | null
  unit: number
  pathname: string
}) {
  try {
    await connectToDB()

    await Module.findOneAndUpdate(
      { _id: moduleId },
      {
        moduleTitle,
        htmlContent: content,
        unit
      }
    )
    revalidatePath(pathname)
  } catch (error: any) {
    throw new Error(`Failed to update module: ${error.message}`)
  }
}

export async function deleteModule(moduleId: string, courseId: string) {
  try {
    await connectToDB()

    const module = await Module.findByIdAndDelete(moduleId)

    if (!module) {
      throw new Error(`Module with ID ${moduleId} not found.`)
    }

    const updatedCourse = await Course.updateOne(
      { _id: courseId },
      { $pull: { modules: moduleId } }
    )

    // Check if the update was successful (GPT suggested improvement)
    if (updatedCourse.matchedCount === 0) {
      throw new Error(`Course with ID ${courseId} not found`)
    }
    if (updatedCourse.modifiedCount === 0) {
      throw new Error(`Module ID ${moduleId} was not found in the course`)
    }

    console.log(
      `Module ${moduleId} deleted and removed from course ${courseId}`
    )
  } catch (error: any) {
    throw new Error(`Failed to delete module: ${error.message}`)
  } finally {
    redirect(`/reactor/courses/${courseId}`)
  }
}
