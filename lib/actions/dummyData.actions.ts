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
        username: 'Guru',
        name: 'Alice Smith',
        image:
          'https://utfs.io/f/10711b1c-da67-4344-9a6f-cc1c5508bb08-r9tb9.png',
        onboarded: true
      },
      {
        id: 'user_2aBcdEfghIjklMnopQrStuvWxYz5678',
        bio: 'Lover of the arts and all things creative.',
        username: 'Bastian12',
        name: 'Bob Johnson',
        image:
          'https://utfs.io/f/bb7fd756-95e0-4ef2-ac9b-793100abb3a1-7x8usz.png',
        onboarded: true
      },
      {
        id: 'user_3aBcdEfghIjklMnopQrStuvWxYz9101',
        bio: 'Avid reader and aspiring writer.',
        username: 'FrankieX',
        name: 'Charlie Brown',
        image:
          'https://utfs.io/f/77193005-66b1-42f5-b28c-149ba8c37904-hsud09.png',
        onboarded: true
      },
      {
        id: 'user_4aBcdEfghIjklMnopQrStuvWxYz1121',
        bio: 'Fitness enthusiast and health advocate.',
        username: 'FitFc',
        name: 'Dana White',
        image:
          'https://utfs.io/f/6ac6e089-fd92-43ea-8017-6f20df790df6-7r8qrp.png',
        onboarded: true
      },
      {
        id: 'user_5aBcdEfghIjklMnopQrStuvWxYz3141',
        bio: 'Tech entrepreneur with a passion for startups.',
        username: 'StarSting',
        name: 'Eli Black',
        image:
          'https://utfs.io/f/15b8fb2b-ea69-458c-a745-2904a4508a0a-7cgjui.png',
        onboarded: true
      },
      {
        id: 'user_6aBcdEfghIjklMnopQrStuvWxYz5161',
        bio: 'Nature lover and outdoor adventurer.',
        username: 'NSy12',
        name: 'Fay Green',
        image: 'https://utfs.io/f/83e761f5-452c-4585-8332-f6b47c407178-1ap.png',
        onboarded: true
      },
      {
        id: 'user_7aBcdEfghIjklMnopQrStuvWxYz7181',
        bio: 'Gamer and tech enthusiast.',
        username: 'BlueBard34',
        name: 'Gary Blue',
        image:
          'https://utfs.io/f/5b1fb643-a1ae-4026-a440-34802fd08a41-fvmr7a.png',
        onboarded: true
      },
      {
        id: 'user_8aBcdEfghIjklMnopQrStuvWxYz9201',
        bio: 'Foodie and culinary explorer.',
        username: 'ChickenSalad',
        name: 'Helen Gray',
        image:
          'https://utfs.io/f/10711b1c-da67-4344-9a6f-cc1c5508bb08-r9tb9.png',
        onboarded: true
      },

      {
        id: 'user_5aBcdEfghIjklMnopQrStuvWxYz3141',
        bio: 'Tech entrepreneur with a passion for startups.',
        username: 'StarStar1',
        name: 'Eli Black',
        image:
          'https://utfs.io/f/93cdb3fa-0eb9-4874-8388-e5720779b384-7cgjui.png',
        onboarded: true
      },
      {
        id: 'user_6aBcdEfghIjklMnopQrStuvWxYz5161',
        bio: 'Nature lover and outdoor adventurer.',
        username: 'NSy12',
        name: 'Fay Green',
        image:
          'https://utfs.io/f/f298fbfc-f006-4a11-a446-58ef498d6231-sv09zt.png',
        onboarded: true
      },
      {
        id: 'user_7aBcdEfghIjklMnopQrStuvWxYz7181',
        bio: 'Gamer and tech enthusiast.',
        username: 'BlueBard34',
        name: 'Gary Blue',
        image:
          'https://utfs.io/f/5b1fb643-a1ae-4026-a440-34802fd08a41-fvmr7a.png',
        onboarded: true
      },
      {
        id: 'user_8aBcdEfghIjklMnopQrStuvWxYz9201',
        bio: 'Foodie and culinary explorer.',
        username: 'ChickenSalad',
        name: 'Helen Gray',
        image:
          'https://utfs.io/f/10711b1c-da67-4344-9a6f-cc1c5508bb08-r9tb9.png',
        onboarded: true
      },

      {
        id: 'user_9aBcdEfghIjklMnopQrStuvWxYz1321',
        bio: 'Fitness enthusiast and personal trainer.',
        username: 'Fieak',
        name: 'Ivy Brown',
        image:
          'https://utfs.io/f/7827da9e-fb47-4c51-83e4-b5852c80d2ce-hqfugl.png',
        onboarded: true
      },
      {
        id: 'user_10aBcdEfghIjklMnopQrStuvWxYz1421',
        bio: 'Digital artist and illustrator.',
        username: 'Artul1',
        name: 'Jake White',
        image:
          'https://utfs.io/f/03accab6-9362-4f09-9d4b-18180062644c-x47bo8.png',
        onboarded: true
      },
      {
        id: 'user_11aBcdEfghIjklMnopQrStuvWxYz1521',
        bio: 'Bookworm and aspiring novelist.',
        username: 'BooXX',
        name: 'Kimberly Read',
        image:
          'https://utfs.io/f/2713f832-3857-445a-b21c-85b95467c569-jot7rq.png',
        onboarded: true
      },
      {
        id: 'user_12aBcdEfghIjklMnopQrStuvWxYz1621',
        bio: 'Travel blogger and photographer.',
        username: 'Wust678',
        name: 'Leo Brown',
        image:
          'https://utfs.io/f/ee0e8ad8-5bbb-4ca3-a195-3b32a51be4d3-q6ciad.png',
        onboarded: true
      },
      {
        id: 'user_13aBcdEfghIjklMnopQrStuvWxYz1721',
        bio: 'Music producer and DJ.',
        username: 'BeatMa',
        name: 'Mia Black',
        image:
          'https://utfs.io/f/9f8b7489-42dc-4cca-ba88-b8e7fe219aad-dlsnl7.png',
        onboarded: true
      },
      {
        id: 'user_14aBcdEfghIjklMnopQrStuvWxYz1821',
        bio: 'Environmental activist and eco-warrior.',
        username: 'GreenEar',
        name: 'Noah Green',
        image:
          'https://utfs.io/f/2fdfb7e0-e783-4144-861e-35dbeb38aa0f-t6ef3m.png',
        onboarded: true
      },
      {
        id: 'user_15aBcdEfghIjklMnopQrStuvWxYz1921',
        bio: 'Film buff and movie critic.',
        username: 'CinemaLo',
        name: 'Olivia Black',
        image:
          'https://utfs.io/f/6ac6e089-fd92-43ea-8017-6f20df790df6-7r8qrp.png',
        onboarded: true
      },
      {
        id: 'user_16aBcdEfghIjklMnopQrStuvWxYz2021',
        bio: 'Fashionista and style influencer.',
        username: 'StyleQueen',
        name: 'Peter Gray',
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
      }
    ])
  } catch (error: any) {
    console.error(`Failed to create/update user: ${error.message}`)
    throw new Error(`Failed to create/update user: ${error.message}`)
  }
}
