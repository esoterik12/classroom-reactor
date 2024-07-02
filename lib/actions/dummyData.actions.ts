'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { connectToDB } from '../mongoose'
import Course from '../models/course.model'
import Module from '../models/module.model'
import User from '../models/user.models'
import mongoose from 'mongoose'
import { createCourseContent } from '../constants/dummyModuleContent'

export async function addDummyModules(courseNames: string[], userId: string) {
  try {
    await connectToDB()

    // Currently not using coureNames input - simply adding modules to ALL courses

    const allCourseNames = await Course.find().select('courseName') // returns {}[] of courseNames and _id

    const allCourseNamesArray = allCourseNames.map(course => course.courseName)

    const generatedContent = createCourseContent(20, 2)

    generatedContent.forEach(module => {
      module.createdBy = new mongoose.Types.ObjectId(userId)
    })

    const insertedDummyModules = await Module.insertMany(generatedContent)

    await Course.updateMany(
      { courseName: { $in: allCourseNamesArray } },
      { $set: { modules: insertedDummyModules } }
    )
  } catch (error: any) {
    console.error('Error adding dummy modules:', error.message)
    throw new Error(`Failed adding dummy modules: ${error.message}`)
  } finally {
    revalidatePath(`/reactor/courses/`)
    redirect(`/reactor/courses/`)
  }
}

export async function addDummyUsers() {
  try {
    await connectToDB()

    // console.log('DUMMY USER FUNCTION DISABLED')
    // return

    await User.insertMany([
      {
        id: 'user_1aBcdEfghIjklMnopQrStuvWxYz1234',
        bio: 'Passionate about technology and innovation.',
        username: 'TechGuru',
        name: 'Alice Smith',
        image:
          'https://utfs.io/f/10711b1c-da67-4344-9a6f-cc1c5508bb08-r9tb9.png',
        onboarded: true
      },
      {
        id: 'user_2aBcdEfghIjklMnopQrStuvWxYz5678',
        bio: 'Lover of the arts and all things creative.',
        username: 'ArtLover',
        name: 'Bob Johnson',
        image:
          'https://utfs.io/f/bb7fd756-95e0-4ef2-ac9b-793100abb3a1-7x8usz.png',
        onboarded: true
      },
      {
        id: 'user_3aBcdEfghIjklMnopQrStuvWxYz9101',
        bio: 'Avid reader and aspiring writer.',
        username: 'Bookworm',
        name: 'Charlie Brown',
        image:
          'https://utfs.io/f/77193005-66b1-42f5-b28c-149ba8c37904-hsud09.png',
        onboarded: true
      },
      {
        id: 'user_4aBcdEfghIjklMnopQrStuvWxYz1121',
        bio: 'Fitness enthusiast and health advocate.',
        username: 'FitFanatic',
        name: 'Dana White',
        image:
          'https://utfs.io/f/6ac6e089-fd92-43ea-8017-6f20df790df6-7r8qrp.png',
        onboarded: true
      },
      {
        id: 'user_5aBcdEfghIjklMnopQrStuvWxYz3141',
        bio: 'Tech entrepreneur with a passion for startups.',
        username: 'StartupStar',
        name: 'Eli Black',
        image:
          'https://utfs.io/f/15b8fb2b-ea69-458c-a745-2904a4508a0a-7cgjui.png',
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
        image:
          'https://utfs.io/f/5b1fb643-a1ae-4026-a440-34802fd08a41-fvmr7a.png',
        onboarded: true
      },
      {
        id: 'user_8aBcdEfghIjklMnopQrStuvWxYz9201',
        bio: 'Foodie and culinary explorer.',
        username: 'FoodFan',
        name: 'Helen Gray',
        image:
          'https://utfs.io/f/10711b1c-da67-4344-9a6f-cc1c5508bb08-r9tb9.png',
        onboarded: true
      }
    ])
    console.log('added dummy users') // Revalidate to refresh profile after edit made
  } catch (error: any) {
    console.error(`Failed to create/update user: ${error.message}`)
    throw new Error(`Failed to create/update user: ${error.message}`)
  }
}

export async function addDummyCourses(userId: string) {
  try {
    // console.log('DUMMY COURSE FUNCTION DISABLED')
    // return

    await connectToDB()
    await Course.insertMany([
      {
        courseName: 'G11',
        image:
          'https://utfs.io/f/452f60ae-8c90-402b-9b86-7d095daa69bc-r9wb1.png',
        description:
          'Students explore foundational topics in math and science.',
        createdBy: userId
      },
      {
        courseName: 'G12',
        image:
          'https://utfs.io/f/452f60ae-8c90-402b-9b86-7d095daa69bc-r9wb1.png',
        description:
          'Students explore foundational topics in math and science.',
        createdBy: userId
      },
      {
        courseName: 'A11',
        image:
          'https://utfs.io/f/0107b8ff-6e23-492a-89b5-4fd419d6c1b0-r9tb9.png',
        description:
          'This course covers basic principles of art and creativity.',
        createdBy: userId
      },
      {
        courseName: 'A12',
        image:
          'https://utfs.io/f/0107b8ff-6e23-492a-89b5-4fd419d6c1b0-r9tb9.png',
        description:
          'This course covers basic principles of art and creativity.',
        createdBy: userId
      },
      {
        courseName: 'C21',
        image:
          'https://utfs.io/f/f5046243-2327-4f58-ad33-eb0926bb6cf7-r9utl.png',
        description:
          'Students learn about the basics of computing and digital literacy.',
        createdBy: userId
      },
      {
        courseName: 'C22',
        image:
          'https://utfs.io/f/f5046243-2327-4f58-ad33-eb0926bb6cf7-r9utl.png',
        description:
          'Students learn about the basics of computing and digital literacy.',
        createdBy: userId
      },
      {
        courseName: 'G21',
        image:
          'https://utfs.io/f/61279a9e-15ee-4311-83d7-48a976d8e54e-r9xsh.png',
        description:
          'Exploring intermediate concepts in geography and environmental sciences.',
        createdBy: userId
      },
      {
        courseName: 'G22',
        image:
          'https://utfs.io/f/61279a9e-15ee-4311-83d7-48a976d8e54e-r9xsh.png',
        description:
          'Exploring intermediate concepts in geography and environmental sciences.',
        createdBy: userId
      },
      {
        courseName: 'D31',
        image:
          'https://utfs.io/f/e34abfbb-81c2-4763-b12e-48d145709a2d-r9vkb.png',
        description:
          'Introduction to dance and movement as forms of expression.',
        createdBy: userId
      },
      {
        courseName: 'B32',
        image:
          'https://utfs.io/f/ca3551ba-5a69-418f-a05e-90efb89644cc-r9u2v.png',
        description:
          'Basic biology concepts including plant and animal life studies.',
        createdBy: userId
      },
      {
        courseName: 'B91',
        image:
          'https://utfs.io/f/ca3551ba-5a69-418f-a05e-90efb89644cc-r9u2v.png',
        description:
          'Basic biology concepts including plant and animal life studies.',
        createdBy: userId
      },
      {
        courseName: 'G91',
        image:
          'https://utfs.io/f/452f60ae-8c90-402b-9b86-7d095daa69bc-r9wb1.png',
        description:
          'Students explore foundational topics in math and science.',
        createdBy: userId
      },
      {
        courseName: 'G92',
        image:
          'https://utfs.io/f/452f60ae-8c90-402b-9b86-7d095daa69bc-r9wb1.png',
        description:
          'Students explore foundational topics in math and science.',
        createdBy: userId
      },
      {
        courseName: 'A91',
        image:
          'https://utfs.io/f/0107b8ff-6e23-492a-89b5-4fd419d6c1b0-r9tb9.png',
        description:
          'This course covers basic principles of art and creativity.',
        createdBy: userId
      },
      {
        courseName: 'A92',
        image:
          'https://utfs.io/f/0107b8ff-6e23-492a-89b5-4fd419d6c1b0-r9tb9.png',
        description:
          'This course covers basic principles of art and creativity.',
        createdBy: userId
      },
      {
        courseName: 'C91',
        image:
          'https://utfs.io/f/f5046243-2327-4f58-ad33-eb0926bb6cf7-r9utl.png',
        description:
          'Students learn about the basics of computing and digital literacy.',
        createdBy: userId
      },
      {
        courseName: 'C82',
        image:
          'https://utfs.io/f/f5046243-2327-4f58-ad33-eb0926bb6cf7-r9utl.png',
        description:
          'Students learn about the basics of computing and digital literacy.',
        createdBy: userId
      },
      {
        courseName: 'G71',
        image:
          'https://utfs.io/f/61279a9e-15ee-4311-83d7-48a976d8e54e-r9xsh.png',
        description:
          'Exploring intermediate concepts in geography and environmental sciences.',
        createdBy: userId
      },
      {
        courseName: 'GX2',
        image:
          'https://utfs.io/f/61279a9e-15ee-4311-83d7-48a976d8e54e-r9xsh.png',
        description:
          'Exploring intermediate concepts in geography and environmental sciences.',
        createdBy: userId
      },
      {
        courseName: 'DY1',
        image:
          'https://utfs.io/f/e34abfbb-81c2-4763-b12e-48d145709a2d-r9vkb.png',
        description:
          'Introduction to dance and movement as forms of expression.',
        createdBy: userId
      },
      {
        courseName: 'BF2',
        image:
          'https://utfs.io/f/ca3551ba-5a69-418f-a05e-90efb89644cc-r9u2v.png',
        description:
          'Basic biology concepts including plant and animal life studies.',
        createdBy: userId
      },
      {
        courseName: 'B01',
        image:
          'https://utfs.io/f/ca3551ba-5a69-418f-a05e-90efb89644cc-r9u2v.png',
        description:
          'Basic biology concepts including plant and animal life studies.',
        createdBy: userId
      },
    ])
  } catch (error: any) {
    console.error(`Failed to create/update user: ${error.message}`)
    throw new Error(`Failed to create/update user: ${error.message}`)
  }
}
